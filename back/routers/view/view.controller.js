const { NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg } = require('../../models')
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

    // res.json({'msg' : 'ok'})
}

let get_auction_view = async (req, res) => {

}

module.exports = {
    get_directdeal_view,
    get_auction_view,
}