const {NftImg, ItemDetail, LikeList, AuctionHistory, Item, ItemInfo, ItemImg} = require('../../models')

let get_directdeal_view = async (req,res)=>{
    res.json({'msg' : 'ok'})
}

let get_auction_view = async (req,res)=>{
    
}

module.exports = {
    get_directdeal_view,
    get_auction_view,
}