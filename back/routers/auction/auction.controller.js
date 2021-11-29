// const { now } = require('sequelize/types/lib/utils')
const { AuctionHistory, Auction, ItemInfo, User, BuyerList } = require('../../models')

const {sendKlay} = require('../../klaytn/kip7_deploy')
const config = require('../../klaytn/config');
const caver = config.caver;
const developerKey = config.developerKey;

const keyring = caver.wallet.keyring.createFromPrivateKey(developerKey);
if (!caver.wallet.getKeyring(keyring.address)) {
  const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(developerKey);
  caver.wallet.add(singleKeyRing);
}


/* 배송 정보 */

let auction_price_post = async (req, res) => {
    console.log(req.body);
    const { params, user, price, prevWallet, prevAmount } = req.body
    console.log("유저 === ", user)
    let result = await AuctionHistory.create({ auc_history_idx: params, bidder: user, bid_price: price, currency: 'KLAY' })

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
    console.log(`현재시간${now.getTime() / 1000}`)

    if (Number(result2.end_date.getTime() / 1000) < Number(now.getTime() / 1000) && result2.bid_boolean == 0) {
        await Auction.update({ bid_boolean: 1 }, { where: { auction_idx: params } })
        endBool = true;
    } else if (Number(result2.end_date.getTime() / 1000) < Number(now.getTime() / 1000)) {
        endBool = true;
    } else {
        endBool = false;
    }

    if (endBool) {
        let id = parseInt(params)
        let result = await ItemInfo.update({
            product_status: 1
        }, {
            where: {
                item_id: id
            }
        })
    }

    let auction_boolean2 = await Auction.findOne({ where: { auction_idx: params } })

    let getprevbidder = await AuctionHistory.findOne({ where: { auc_history_idx: params }, order: [['bid_date', 'desc']] })
    // console.log(getprevbidder);

    const prev_bidder = getprevbidder.dataValues.bidder
    const prev_price = getprevbidder.dataValues.bid_price

    console.log(`이거 `)
    if (auction_boolean2.bid_boolean == 1) {
        let UpdateAuction = await Auction.update({ bid_boolean: 2 }, { where: { auction_idx: params } })
        let result3 = await ItemInfo.findOne({ where: { item_id: params } })
        let result4 = await BuyerList.findOne({ where: { item_code: result3.item_code } })

        let result5 = await User.findOne({ where: { user_idx: result4.buyer_idx } })
        console.log(result5.kaikas_address)
        let buyer = result5.kaikas_address
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

        let data = {
            current: bid_price,
            endDate: endBool,
            bid_boolean: result2.bid_boolean,
            buyer: buyer,
            prev_bidder,
            prev_price
        }
        res.json(data)
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