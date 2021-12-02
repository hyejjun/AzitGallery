// const { now } = require('sequelize/types/lib/utils')
const { AuctionHistory, Auction, ItemInfo, User, BuyerList, Orders, Nft, OrderDetail,ShipInfo } = require('../../models')

const { sendKlay } = require('../../klaytn/kip7_deploy')
const config = require('../../klaytn/config');
const caver = config.caver;
const developerKey = config.developerKey;

const keyring = caver.wallet.keyring.createFromPrivateKey(developerKey);
if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(developerKey);
    caver.wallet.add(singleKeyRing);
}


/* 입찰 내역 db insert */

let auction_price_post = async (req, res) => {
    console.log(req.body);
    const { params, user, price, prevWallet, prevAmount } = req.body
    let result = await AuctionHistory.create({ auc_history_idx: params, bidder: user, bid_price: price, currency: 'klay' })

    sendKlay(prevWallet, prevAmount)

    let iteminfo = await ItemInfo.findOne({ where: { item_id: params } })
    let userinfo = await User.findOne({ where: { kaikas_address: user } })

    let buyerlist = await BuyerList.findAll({ where: { item_code: iteminfo.item_code } })
    console.log(iteminfo.item_code)
    console.log(userinfo.user_idx)
    console.log(iteminfo.creator)
    if (buyerlist.length == 0) {
        await BuyerList.create({ item_code: iteminfo.item_code, buyer_idx: userinfo.user_idx, sender_idx: iteminfo.creator })
    } else {
        await BuyerList.update({ item_code: iteminfo.item_code, buyer_idx: userinfo.user_idx, sender_idx: iteminfo.creator }, { where: { item_code: iteminfo.item_code } })
    }

}


let auction_current_post = async (req, res) => {

    const { params } = req.body
    console.log(`useeffect 작동 여부${params}`)

    let result = await AuctionHistory.findAll({ where: { auc_history_idx: params } })
    let result2 = await Auction.findOne({ where: { auction_idx: params } })
    // console.log("여기 1 =======",result[result.length-1].bid_price)
    // console.log("여기 2 =======",result2)
    let bid_price = result[result.length - 1].bid_price

    let endBool;

    let now = new Date()
    console.log(`종료시간${result2.end_date.getTime() / 1000}`)
    console.log(`종료시간${result2.end_date}`)
    console.log(`현재시간${now.getTime() / 1000}`)

    if (Number(result2.end_date.getTime() / 1000) < Number(now.getTime() / 1000) && result2.bid_boolean == 0) {
        await Auction.update({ bid_boolean: 1 }, { where: { auction_idx: params } })
        endBool = true;
    } else if (Number(result2.end_date.getTime() / 1000) < Number(now.getTime() / 1000) && result2.if_extened == 1) {
        let extended_time = ((result2.end_date.getTime() / 1000) + 300) * 1000
        await Auction.update({ bid_boolean: 0, end_date: extended_time }, { where: { auction_idx: params } })
        endBool = false;
    } else {
        endBool = false;
    }

    if (endBool) {
        let id = parseInt(params)
        let soldout = await ItemInfo.update({
            product_status: 1
        }, {
            where: {
                item_id: id
            }
        })

        // 최종 금액 조회
        let result2 = await AuctionHistory.findOne({
            where: {
                auc_history_idx: id
            },
            attributes: ['bid_price', 'bidder'],
            order: [['bid_date', 'desc']]
        })
        console.log('여기 ========');
        console.log(result2.dataValues.bidder.length)

        if (result2.dataValues.bidder.length !== 1) {
            let result3 = await User.findOne({
                where: {
                    kaikas_address: result2.dataValues.bidder
                }
            })

            // 배송 테이블로 옮기고
            let final_price = parseFloat(result2.dataValues.bid_price)
            // 판매자
            let seller_idx = soldout[0]

            let find_item_info = await ItemInfo.findOne({
                where: {
                    item_id: id
                }
            })

            const { item_code, sell_type, size, color } = find_item_info.dataValues

            let find_nft_idx = await Nft.findAll({ where: { nft_img_idx: id, product_status: '판매중' } })
            let nft_idx = Math.min(find_nft_idx[0].id)
            let nftAddress = find_nft_idx[0].nft

            let result4 = await Orders.create({
                total_price: `${final_price}`,
                buyer: result3.dataValues.user_idx,
                final_order_state: '배송정보필요',
                user_idx: find_item_info.dataValues.creator
            })

            let result5 = await OrderDetail.create({
                size,
                color,
                shipper_idx: seller_idx,
                item_code: `${item_code}00-${nft_idx}`,
                price: final_price,
                order_num: result4.dataValues.order_num,
                item_id: id,
                delivery_state: '배송준비중'
            })

            let ship_info = await ShipInfo.create({
                order_num:result4.dataValues.order_num,
                item_delivery_state:'배송준비중',
                order_detail_num:result5.dataValues.id
            })

            // 판매자에게 돈 보내기
            let find_seller = await User.findOne({
                where: {
                    user_idx: find_item_info.dataValues.creator
                }
            })

            let seller_wallet = find_seller.dataValues.kaikas_address

            sendKlay(`${seller_wallet}`, `${final_price}`)


            // nft 테이블에서 판매 완료로 바꿔주기
            let soldoutNFT = await Nft.update({
                product_status: '판매완료'
            }, {
                where: {
                    nft: `${nftAddress}`
                }
            })

        }
    }

    let auction_boolean2 = await Auction.findOne({ where: { auction_idx: params } })

    let getprevbidder = await AuctionHistory.findOne({ where: { auc_history_idx: params }, order: [['bid_date', 'desc']] })

    const prev_bidder = getprevbidder.dataValues.bidder
    const prev_price = getprevbidder.dataValues.bid_price

    if (auction_boolean2.bid_boolean == 1) {
        // let UpdateAuction = await Auction.update({ bid_boolean: 2 }, { where: { auction_idx: params } })
        // let result3 = await ItemInfo.findOne({ where: { item_id: params } })
        // let result4 = await BuyerList.findOne({ where: { item_code: result3.item_code } })

        // let result5 = await User.findOne({ where: { user_idx: result4.buyer_idx } })
        // console.log(result5.kaikas_address)
        // let buyer = result5.kaikas_address
        // let seller = await User.findOne({where : { id : result4.seller_idx }})
        // console.log(`구매자 ${buyer.kaikas_address}`)


        // 구매자에게서 관리자로 토큰 이동

        // const keyring = caver.wallet.keyring.createFromPrivateKey(
        //     "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b"
        // );
        // // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
        // // 자기 것의 개인키를 keyring 시키고
        // if (!caver.wallet.getKeyring(keyring.address)) {
        //     const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
        //         "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b"
        //     );
        //     caver.wallet.add(singleKeyRing);
        // }

        // const kip7Instance = new caver.kct.kip7('0x86C910E42689c1F2023694f5C97C25Be349d86Ac')
        // kip7Instance.name().then(console.log)
        // kip7Instance.balanceOf("0x560804ad0438504b9202f6E8930D6175f2CC8EDF").then(console.log)
        // kip7Instance.approve('0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce', 1000000, { from: '0x560804ad0438504b9202f6E8930D6175f2CC8EDF' }).then(console.log)
        // const opts = { from: "0x560804ad0438504b9202f6E8930D6175f2CC8EDF" }
        // //보낼 account 주소를 입력 시키기
        // const recipientAddress = '0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce'
        // const value = 10000000000
        // const receipt = kip7Instance.transfer(recipientAddress, value, opts)
        // console.log(receipt)



        // 판매자에게서 관리자로 nft transfer

        // let senderPrivateKey = "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b";
        // const senderKeyring = caver.wallet.keyring.createFromPrivateKey(
        //     senderPrivateKey
        // );
        // // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
        // if (!caver.wallet.getKeyring(senderKeyring.address)) {
        //     const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
        //         senderPrivateKey
        //     );
        //     caver.wallet.add(singleKeyRing);
        // }

        // let contractAddr = "0x8f56a4664a46957a06f0edd47bba25d0224df5ff";

        // const KIP_17 = new caver.kct.kip17(contractAddr);

        // transferResult = await KIP_17.transferFrom(
        //     senderKeyring.address,
        //     "0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce",
        //     5511296877575945,
        //     { from: senderKeyring.address, gas: 200000 }
        // );
        // console.log(transferResult);

        // let data = {
        //     current: bid_price,
        //     endDate: endBool,
        //     bid_boolean: result2.bid_boolean,
        //     buyer: buyer,
        //     prev_bidder,
        //     prev_price
        // }
        // res.json(data)
    } else {
        let data = {
            current: bid_price,
            endDate: endBool,
            bid_boolean: result2.bid_boolean,
            prev_bidder,
            prev_price
        }
        res.json(data)
    }

}


let auction_close = async (req, res) => {
    console.log("여기 ==== ", req.body);
    const { params } = req.body
    let id = parseInt(params)
    let result = await ItemInfo.update({
        product_status: 1
    }, {
        where: {
            item_id: id
        }
    })
}

module.exports = {
    auction_price_post,
    auction_current_post,
    auction_close
}