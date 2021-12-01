const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User, Auction, DirectDeal, Nft } = require('../../models')
const Sequelize = require('sequelize')
const { createHash } = require('crypto')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)
    let directView = await ItemInfo.findOne({where:{item_id:idx}})
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
            seller_kaikas_address:user.kaikas_address,
            description:directView.description,
            title:directView.title,
            size:directView.size,
            color:directView.color,
            price:price.price,
            currency:price.currency,
            item_img_link:imgArr,
            qty:[]
        }
    }catch(e){

    }
    res.json(data)
}

let get_auction_view = async (req, res) => {
    let key = Object.keys(req.body)
    if(key.length !== 0){
        let idx = JSON.parse(key)
        let data = {};
        try {
    
            let result = await ItemInfo.findOne({
                 where: { 
                     item_id: idx, sell_type: 1 
                    } 
                })
            const { 
                creator, 
                description, 
                title, 
                registered_at, 
                size, 
                color } = result.dataValues
    
            let result2 = await User.findOne({ 
                where: { 
                    user_idx: creator 
                }, 
                attributes: 
                    ['nick_name', 'kaikas_address'] 
            })
            const { nick_name, kaikas_address } = result2.dataValues
    
            // @ 경매 정보
            let result3 = await AuctionHistory.findOne({ 
                where: { 
                    auc_history_idx: idx 
                },
                order: 
                    [['bid_price', 'DESC']] 
            })
            const { bid_date, bid_price, currency } = result3.dataValues
    
            // @ 경매 종료 시간
            let result4 = await Auction.findOne({ where: { auction_idx: idx }, attributes: ['end_date'] })
            const { end_date } = result4.dataValues
    
            let result5 = await ItemImg.findAll({ where: { item_id: idx } })
    
            let pic_array = [...result5]
            let item_img_link = []
    
            pic_array.forEach((v, k) => {
                item_img_link.push(v.dataValues.item_img_link)
            })
    
            let kr_end_date = end_date.toLocaleString()

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
                kr_end_date,
                seller_kaikas_address : kaikas_address
            }
    
        } catch (error) {
            data = {
                result_msg: 'Fail',
                msg: '해당 페이지가 없어요'
            }
        }
        res.json(data)
    
    }
    
}

let get_qty = async (req,res) => {
    let data
    try{
        let {item_id} = req.body
        let {size,color} = req.body.selected
        let qty = await ItemDetail.findOne({where:{item_info_idx:item_id,size:size,color:color}})
        let qtydata = await Nft.findAll({where:{nft_img_idx:qty.nft_idx,product_status:'판매중'}})
        let qtyArr = []
        if(qtydata.length!==0){
            for(let i=1;i<=qtydata.length;i++){
                qtyArr.push(i)
            }
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