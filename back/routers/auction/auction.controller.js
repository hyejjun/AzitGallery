const {AuctionHistory, Auction} = require('../../models')

/* 배송 정보 */

let auction_price_post = async (req,res)=>{

    const {params,user,price} = req.body
    console.log(price)
    let result = await AuctionHistory.create({auc_history_idx:params,bidder:user,bid_price:price,currency:price})
    res.json()
}


let auction_current_post = async (req,res)=>{

    const {params} = req.body
    console.log(`useeffect 작동 여부${params}`)

    let result = await AuctionHistory.findAll({where:{auc_history_idx:params}})
    let endDate = await Auction.findOne({where:{auction_idx:params}})
    console.log(result[result.length-1].bid_price)
    console.log(endDate)
    let bid_price = result[result.length-1].bid_price
    let data = {
        current:bid_price,
        endDate:endDate.end_date
    }
    res.json(data)
}
module.exports = {
    auction_price_post,
    auction_current_post
}