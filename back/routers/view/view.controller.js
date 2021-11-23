const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User, Auction, DirectDeal } = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {
  
    let key = Object.keys(req.body)
    let previdx = JSON.parse(key)
    let idx = previdx.replace('}',' ')
    console.log(`맨 처음시 작동 되기는 하니toto??${idx.replace('}',' ')}`)
    // @ user 에 대한 정보 가져와서 like 조회해야함.
    // @ idx 로 해당 view 조회하기
    let data = {};

        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type: 0 } })
        const { creator, description, title, registered_at, size, color } = result.dataValues
        console.log(` 하니toto??${creator}`)
        let result2 = await User.findOne({ where: { user_idx: creator }, attributes: ['nick_name'] })
        const { nick_name } = result2.dataValues
        
        // let result3 = await DirectDeal.findOne({where:{direct_deal_idx:idx}})
        // const {price, currency} = result3.dataValues

        let result4 = await ItemImg.findAll({where:{item_id:idx}})

        let pic_array = [...result4]
        let item_img_link = []

        pic_array.forEach((v,k)=>{
            item_img_link.push(v.dataValues.item_img_link)
        })

        send = {
            result_msg: 'OK',
            nick_name,
            description,
            title,
            size,
            color,
            // price,
            // currency,
            item_img_link
        }
        console.log(`데이터 제대로 찾았니?${data}`)
    res.json(send)
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
        let result4 = await Auction.findOne({ where: { auction_idx: idx }, attributes: ['end_date'] })
        const { end_date } = result4.dataValues

        function timeForToday(value) {
            const today = new Date();
            const timeValue = new Date(value);

            const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);

            if (betweenTime < 1) return '방금전';
            if (betweenTime < 60) {
                return `${betweenTime}분전`;
            }

            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간전`;
            }

            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay < 365) {
                return `${betweenTimeDay}일전`;
            }

            return `${Math.floor(betweenTimeDay / 365)}년전`;
        }

        // @ 이 부분을 따로 websocket으로 받을 수 있어야할듯..
        let left_time = timeForToday(end_date)



        let result5 = await ItemImg.findAll({where:{item_id:idx}})

        let pic_array = [...result5]
        let item_img_link = []

        pic_array.forEach((v,k)=>{
            item_img_link.push(v.dataValues.item_img_link)
        })


        data = {
            result_msg: 'OK',
            nick_name,
            description,
            title,
            size,
            color,
            bid_price,
            currency,
            left_time,
            item_img_link
        }

    } catch (error) {
        data = {
            result_msg: 'Fail',
            msg: '해당 페이지가 없어요'
        }
    }
    res.json(data)

}

module.exports = {
    get_directdeal_view,
    get_auction_view,
}