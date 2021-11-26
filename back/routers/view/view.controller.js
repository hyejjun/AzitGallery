const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User, Auction, DirectDeal } = require('../../models')
const Sequelize = require('sequelize')
const { createHash } = require('crypto')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {

    console.log(req.body)
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)
    console.log("idx =====", idx)
    // @ user 에 대한 정보 가져와서 like 조회해야함.
    // @ idx 로 해당 view 조회하기
    let directView = await ItemInfo.findOne({where:{item_id:idx}})
    console.log(directView)
    let price = await DirectDeal.findOne({where:{direct_deal_idx:idx}})
    let user = await User.findOne({where:{user_idx:directView.creator}})
    let img = await ItemImg.findAll({where:{item_img_idx:idx}})

    let imgArr = []
    for(let i=0;i<img.length;i++){
        imgArr.push(img[i].item_img_link)
    } 


    let data = {};
    try{
        data = {
            result_msg: 'OK',
            nick_name:user.nick_name,
            description:directView.description,
            title:directView.title,
            size:directView.size,
            color:directView.color,
            price:price.price,
            currency:price.currency,
            item_img_link:imgArr,
            qty:[]
            
            //qty:qtyArr
            //qty:[1,2,3,4,5,6]
        }

    }catch(e){

    }
    /*

    try {
        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type: 0 } })
        const { creator, description, title, registered_at, size, color, main_img_link } = result.dataValues

        let result2 = await User.findOne({ where: { user_idx: creator }, attributes: ['nick_name'] })
        const { nick_name } = result2.dataValues

        let result3 = await DirectDeal.findOne({ where: { direct_deal_idx: idx } })
        const { price, currency } = result3.dataValues

        let result5 = await ItemDetail.findOne({where:{color:color,size:size,item_info_idx:result.item_id},attributes:['qty']})
        const { qty } = result5.dataValues

        let pic_array = [...result4]
        let item_img_link = []

        pic_array.forEach((v, k) => {
            item_img_link.push(v.dataValues.item_img_link)
        })

        let qtyArr = []
        for(i=1;i<=qty;i++){
            qtyArr.push(i)
        }
        
        console.log(color)
        console.log(size)
        console.log(result.item_id)
        console.log(qtyArr)

        data = {
            result_msg: 'OK',
            nick_name,
            description,
            title,
            size,
            color,
            price,
            currency,
            item_img_link,
            qty:qtyArr
        }

    } catch (error) {
        data = {
            result_msg: 'Fail',
            msg: '해당 페이지가 없어요'
        }
    }
    */
    res.json(data)
}

let get_auction_view = async (req, res) => {
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)

    let data = {};

    try {

        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type: 1 } })
        const { creator, description, title, registered_at, size, color } = result.dataValues

        let result2 = await User.findOne({ where: { user_idx: creator }, attributes: ['nick_name'] })
        const { nick_name } = result2.dataValues

        // @ 경매 정보
        let result3 = await AuctionHistory.findOne({ where: { auc_history_idx: idx }, order: [['bid_price', 'DESC']] })
        const { bid_date, bid_price, currency } = result3.dataValues

        // @ 경매 종료 시간
        // let result4 = await Auction.findOne({ where: { auction_idx: idx }, attributes: ['end_date'] })
        // const { end_date } = result4.dataValues


        let result5 = await ItemImg.findAll({where:{item_id:idx}})

        let pic_array = [...result5]
        let item_img_link = []

        pic_array.forEach((v,k)=>{
            item_img_link.push(v.dataValues.item_img_link)
        })


        // function timeForToday(value) {
        //     const today = new Date();
        //     const timeValue = new Date(value);

        //     const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);

        //     if (betweenTime < 1) return '방금전';
        //     if (betweenTime < 60) {
        //         return `${betweenTime}분전`;
        //     }

        //     const betweenTimeHour = Math.floor(betweenTime / 60);
        //     if (betweenTimeHour < 24) {
        //         return `${betweenTimeHour}시간전`;
        //     }

        //     const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        //     if (betweenTimeDay < 365) {
        //         return `${betweenTimeDay}일전`;
        //     }

        //     return `${Math.floor(betweenTimeDay / 365)}년전`;
        // }

        // @ 이 부분을 따로 websocket으로 받을 수 있어야할듯..
        // let left_time = timeForToday(end_date)

        data = {
            result_msg: 'OK',
            nick_name,
            description,
            title,
            size,
            color,
            bid_price,
            currency,
            item_img_link,
        }

    } catch (error) {
        data = {
            result_msg: 'Fail',
            msg: '해당 페이지가 없어요'
        }
    }
    res.json(data)

}

let get_qty = async (req,res) => {
    let data
    try{
        let {item_id} = req.body
        let {size,color} = req.body.selected
        console.log(size,color)
        let qty = await ItemDetail.findOne({where:{item_info_idx:item_id,size:size,color:color}})
        let qtyArr = []
        for(let i=1;i<=qty.qty;i++){
            qtyArr.push(i)
        }
        data = {
            result_msg:'OK',
            result:qtyArr
        }
    }catch(e){
        data = {
            result_msg:'Fail',
            msg:'페이지가 존재하지 않습니다.'
        }
    }
    res.json(data)
}


let get_size = async (req,res) => {
    let data
    try{
        let { item_id } = req.body
        let { color } = req.body.selected
        let size = await ItemDetail.findAll({where:{color:color,item_info_idx:item_id}})
        let sizeArr = []
        for(let i=0;i<size.length;i++){
            sizeArr.push(size[i].size)
        }
        data = {
            result_msg:'OK',
            result:sizeArr
        }
        
    }catch(e){
        data = {
            result_msg:'Fail',
            msg:'페이지가 존재하지 않습니다.'
        }
    }
    res.json(data)
}

module.exports = {
    get_directdeal_view,
    get_auction_view,
    get_qty,
    get_size
}