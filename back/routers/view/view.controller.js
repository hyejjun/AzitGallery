const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User } = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)

    // @ idx 로 해당 view 조회하기
    /*
    SELECT creator, size, color, price, nft_img description FROM item, item_detail, direct_deal, item_info, nft_img WHERE item_id=1;
    */
    // 여기서 쿼리로 검색...

    let data = {};

    try {
        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type:0 } })
        const {creator, description, title, registered_at} = result.dataValues
    
        let result2 = await User.findOne({where:{user_idx:creator}, attributes: ['nick_name']})
        const {nick_name} = result2.dataValues
    
        data = {
            result_msg: 'OK',
            nick_name, 
            description, 
            title
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

}

module.exports = {
    get_directdeal_view,
    get_auction_view,
}