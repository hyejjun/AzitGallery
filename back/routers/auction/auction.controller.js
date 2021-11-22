const {AuctionHistory, Auction, BuyerList, ItemInfo, User} = require('../../models')

/* 배송 정보 */

let auction_price_post = async (req,res)=>{

    const {params,user,price} = req.body
    console.log(price)
    let result = await AuctionHistory.create({auc_history_idx:params,bidder:user,bid_price:price,currency:price})
  
    let iteminfo = await ItemInfo.findOne({where:{item_id:params}})
    let userinfo = await User.findOne({where:{kaikas_address:user}})
    
    let buyerlist = await BuyerList.findAll({where:{item_code:iteminfo.item_code}})
    console.log(iteminfo.item_code)
    console.log(userinfo.user_idx)
    console.log(iteminfo.creator)
    if(buyerlist.length == 0 ){
        await BuyerList.create({item_code:iteminfo.item_code, buyer_idx:userinfo.user_idx, sender_idx:iteminfo.creator})
    }else{
        await BuyerList.update({item_code:iteminfo.item_code, buyer_idx:userinfo.user_idx, sender_idx:iteminfo.creator},{where:{item_code:iteminfo.item_code}})
    }
    res.json()
}


let auction_current_post = async (req,res)=>{

    const {params} = req.body
    console.log(`useeffect 작동 여부${params}`)

    let result = await AuctionHistory.findAll({where:{auc_history_idx:params}})
    let result2 = await Auction.findOne({where:{auction_idx:params}})
    // console.log("여기 1 =======",result[result.length-1].bid_price)
    // console.log("여기 2 =======",result2)
    let bid_price = result[result.length-1].bid_price

    if(result2.dataValues.bid_boolean == 1){
        let UpdateAuction = await Auction.update({bid_boolean:2},{where:{auction_idx:params}})

        // 구매자에게서 관리자로 토큰 이동

            const keyring = caver.wallet.keyring.createFromPrivateKey(
                "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b"
            );
            // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
            // 자기 것의 개인키를 keyring 시키고
            if (!caver.wallet.getKeyring(keyring.address)) {
                const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
                "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b"
                );
                caver.wallet.add(singleKeyRing);
            }

            const kip7Instance = new caver.kct.kip7('0xbd929FED827F26E84ca8b66A35Ef694F5829f9De')
            kip7Instance.name().then(console.log)
            const opts = { from: keyring.address }
            //보낼 account 주소를 입력 시키기
            const recipientAddress = '0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce'
            const value = 10000000000
            const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
            console.log(receipt)



        // 판매자에게서 관리자로 nft transfer

        let senderPrivateKey = "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b";
        const senderKeyring = caver.wallet.keyring.createFromPrivateKey(
            senderPrivateKey
        );
        // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
        if (!caver.wallet.getKeyring(senderKeyring.address)) {
            const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
            senderPrivateKey
            );
            caver.wallet.add(singleKeyRing);
        }

            let contractAddr = "0x8f56a4664a46957a06f0edd47bba25d0224df5ff";

                const KIP_17 = new caver.kct.kip17(contractAddr);

                transferResult = await KIP_17.transferFrom(
                senderKeyring.address,
                "0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce",
                5511296877575945,
                { from: senderKeyring.address, gas: 200000 }
                );
                console.log(transferResult);
            

    }
    let data = {
        current:bid_price,
        endDate:result2.dataValues.end_date,
        bid_boolean:result2.dataValues.bid_boolean
    }
    res.json(data)
}
module.exports = {
    auction_price_post,
    auction_current_post
}