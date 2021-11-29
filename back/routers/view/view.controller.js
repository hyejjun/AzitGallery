const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User, Auction, DirectDeal } = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {

    console.log(req.body)
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)
    console.log("idx =====", idx)
    // @ user 에 대한 정보 가져와서 like 조회해야함.
    // @ idx 로 해당 view 조회하기


    let data = {};

    try {
        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type: 0 } })
        const { creator, description, title, registered_at, size, color } = result.dataValues

        let result2 = await User.findOne({ where: { user_idx: creator }, attributes: ['nick_name'] })
        const { nick_name } = result2.dataValues

        let result3 = await DirectDeal.findOne({ where: { direct_deal_idx: idx } })
        const { price, currency } = result3.dataValues

        let result4 = await ItemImg.findAll({ where: { item_id: idx } })

        let pic_array = [...result4]
        let item_img_link = []

        pic_array.forEach((v, k) => {
            item_img_link.push(v.dataValues.item_img_link)
        })

        data = {
            result_msg: 'OK',
            nick_name,
            description,
            title,
            size,
            color,
            price,
            currency,
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

        let result5 = await ItemImg.findAll({ where: { item_id: idx } })

        let pic_array = [...result5]
        let item_img_link = []

        pic_array.forEach((v, k) => {
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
            item_img_link,
            kr_end_date
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