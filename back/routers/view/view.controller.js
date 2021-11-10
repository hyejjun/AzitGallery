const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg, User } = require('../../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let get_directdeal_view = async (req, res) => {
    let key = Object.keys(req.body)
    let idx = JSON.parse(key)
    // @ user 에 대한 정보 가져와서 like 조회해야함.
    // @ idx 로 해당 view 조회하기
    

    let data = {};

    try {
        let result = await ItemInfo.findOne({ where: { item_id: idx, sell_type:0 } })
        console.log(result);
        const {creator, description, title, registered_at, size, color} = result.dataValues
    
        let result2 = await User.findOne({where:{user_idx:creator}, attributes: ['nick_name']})
        const {nick_name} = result2.dataValues
    
        data = {
            result_msg: 'OK',
            nick_name, 
            description, 
            title,
            size,
            color
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