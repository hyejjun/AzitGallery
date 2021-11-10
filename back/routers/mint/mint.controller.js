const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory, SubCategory } = require('../../models')
const express = require('express')
//https://baobab.scope.klaytn.com/account/0xdfaf037869bb807239e8c46d3b3472ac72adbaef?tabId=txList
const option = {
    headers: [
        {
            name: "Authorization",
            //https://console.klaytnapi.com/ko/security/credential 여기서 발급
            value: "Basic " + Buffer.from("KASKIQX7OFKY5O7JUNTN9FOK" + ":" + "7rpDsRRxYvHYIeS42bNtT2TAtfAQ9tRBC9mf6bst").toString("base64"),
        },
        { name: "x-krn", value: "krn:1001:node" },
    ],
};
  
const Caver = require("caver-js");
const caver = new Caver(
    new Caver.providers.HttpProvider(
      "https://node-api.klaytnapi.com/v1/klaytn",
      option
    )
);

let mint_nft_post = async (req,res) => {
    // 나중에는 creator 도 가져와야함..
    const {ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension, gender, bigCategory, smallCategory} = req.body[0]
    //      bool    str    str       str   str    str      obj     obj   str       str      bool      str      str           str
    const imagesLink = req.body[1]
    let sell_type
    console.log(req.body)
    ifSell == true ? sell_type = false : sell_type = true
    let data // res.json 리턴용

    try{
        // user_idx 받아오기
        let get_user_id = await User.findOne({
            where: {
                user_idx:1// from req.body
        }})

        // category 가져오기
        let get_subcategory = await SubCategory.findOne({

        })

        // 받은 id로 item_info table에 추가
        let add_to_item_info = await ItemInfo.create({
            creator: get_user_id.dataValues.user_idx, 
            item_code: `${new Date().getTime()}${smallCategory}`, 
            description: desc,
            title: name,
            sell_type,
            size: size.join(','),
            color: color.join(','),
            category_id: bigCategory, 
        })

        // 다시 생각해보기: imagesLink로 for 또는 add to Item으로?
        imagesLink.forEach(async x=>{
            console.log('is forEach working?')
            await ItemImg.create({
                item_img_idx: add_to_item_info.dataValues.item_id,
                item_img_link: x
            })
        })

        // 색과 사이즈 별로 넣기
        for(let i = 0; i<color.length; i++){
            for(let j = 0; j<size.length; j++){
                // 색과 사이즈를 00~99로 해서 자릿수를 맞춰준다
                let last_digits_for_detail
                if(i == 0 && j == 0){
                    last_digits_for_detail = `00`
                }else if(i*size.length+j<10){
                    last_digits_for_detail = `0${i*size.length+j}`
                } else if(i*size.length+j>=10 || i*size.length+j+1<100){
                    last_digits_for_detail = `${i*size.length+j}`
                }

                // 오류해결
                // getNFT(name,color[i],size[j])

                await ItemDetail.create({
                    item_detail_idx: i*size.length+j+1,  // item_detail_idx 넣기
                    item_info_idx: add_to_item_info.dataValues.item_id,
                    size:size[j],
                    color: color[i],
                    nft:`${Number(`${new Date().getTime()}101`)}${size[j]}${color[i]}`, //임시로
                    item_code:`${add_to_item_info.dataValues.item_code}${last_digits_for_detail}`,
                    product_status:'ready' //임시로
                })    
            }
        }     

        // 일반구매일 때
        if(ifSell == true && get_user_id.length !== 0){
            // direct deal에 추가하기 -> 경매와 다름
            await DirectDeal.create({
                direct_deal_idx: add_to_item_info.dataValues.item_id,
                price: Number(price),
                currency
            })

            data = {
                result_msg: 'OK',
                msg: 'item 등록 성공'
            }

            res.send(data)
        } else if( ifSell == false && get_user_id.length !== 0){
            //경매일 때
            // 경매 테이블에 데이터 넣기...
            
            await Auction.create({
                auction_idx: add_to_item_info.dataValues.item_id,
                end_date: aucTime,
                if_extended: extension,
            })

            // 경매 히스토리 최상단에도 넣어주어야 함
            await AuctionHistory.create({
                auc_history_idx: add_to_item_info.dataValues.item_id,
                bidder: get_user_id.dataValues.user_idx,
                bid_price: Number(aucPrice),
                currency
            })
            
            data = {
                result_msg: 'OK',
                msg: 'item 등록 성공'
            }
            res.send(data)

        } else{
            // 만에 하나 get_user_id가 없는 경우. 
            // 정상 접근인데 다른 경우가 있는 경우도 추가
            data = {
                result_msg: 'Fail',
                msg: '존재하지 않는 유저입니다. 로그인 상태를 다시 확인해주세요.'
            }
            res.send(data)
        }
        console.log('NFT')
    } catch(e){
        console.log(e)
        data = {
            result_msg: 'Fail',
            msg: e
        }
        res.send(data) 
    }
    async function getNFT(name, color, size){
        let strname = String(name)
        let strcolor = String(color)
        let strsize = String(size)
        let privateKey = "0xb6a4306091a3f4203b497cf461f22624f372c3cffe31d8c0f874ef75a7d1881f" // DB에서 가져와야 함
        let accountAddress = "0x54e034470aB35768C24607Bb847870D776E10DE4"
        console.log('beforeKeyRing')
        // 개인키를 바탕으로 keyring을 생성합니다.
        // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef 여기서 
        // keyring에 대한 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/Caver-js/api-references/Caver.wallet/keyring 를 참고하세요.
        // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  개인키
        const keyring = caver.wallet.keyring.createFromPrivateKey(
            privateKey
        );
        // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
        console.log('beforegetKeyRing')
        if (!caver.wallet.getKeyring(keyring.address)) {
            const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
                privateKey
            );
            caver.wallet.add(singleKeyRing);
        }
        // 넘어온 데이터를 바탕으로 새로운 KIP-17을 배포(=새로운 명품 등록)합니다. 
        console.log('beforekip17')
        const kip17 = await caver.kct.kip17.deploy(
            {
            name: strname,
            symbol: 'EPI',
            },
            keyring.address
        );
        // console.log(kip17)
        // console.log(kip17.options.address);
        // 컨트랙트 주소 기반으로 KIP-17 오브젝트를 생성합니다.
        console.log('kip_17')
        const kip_17 = new caver.kct.kip17(kip17.options.address);
        // 새로 발행하는 토큰에 임의의 tokenId를 할당하기 위해 Math.random 사용 및 중복 여부를 체크합니다.
        randomTokenID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);  
        try {
            console.log('try')
            owner = await kip_17.ownerOf(randomTokenID);
        } catch (e) {
            console.log('catch')
            // owner가 존재하지 않는 경우(=존재하지 않는 tokenID) 에러가 리턴됩니다.
            // 에러를 받으면 해당 tokenID로 토큰 생성이 가능합니다.
            console.log("we can mint");
            // tokenURI에는 임의의 정보를 넣어줄 수 있습니다.
            // 본 예제에서는 임의의 sellerID와 productID를 json 형태로 저장합니다.
            // 토큰 이미지 URL이나 기타 정보를 tokenURI에 저장할 수 있습니다.
            tokenURI = JSON.stringify({
                color: strcolor,
                size: strsize,
            });
            // KIP-17.mintWithTokenURI를 이용해서 새로운 토큰을 발행합니다.
            // 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/KIP-17#KIP-17-mintwithtokenuri 를 참고하세요.
            mintResult = await kip_17.mintWithTokenURI(
                // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  account주소를 넣는다
                accountAddress,
                randomTokenID,
                tokenURI,
                { from: keyring.address }
            );
            console.log(mintResult.events.Transfer.address,'address')
            return mintResult.events.Transfer.address
        }
    }

}



let KIP7Token_transfer = async () => {

  // 해당 토큰으로 구매하기

  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0xee787cc5b6cb27bc9ff018be6fad5db255a759c62e6170e18a80a282436a3699"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  // 자기 것의 개인키를 keyring 시키고
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0xee787cc5b6cb27bc9ff018be6fad5db255a759c62e6170e18a80a282436a3699"
    );
    caver.wallet.add(singleKeyRing);
  }

  const kip7Instance = new caver.kct.kip7('0x8586822bAaE5388BF1ee0a6de2e750dE80cA063a')
  kip7Instance.name().then(console.log)
  const opts = { from: keyring.address }
  //보낼 account 주소를 입력 시키기
  const recipientAddress = '0x5F5c71c26C985dB9CEcc4ba280534F75fdb54220'
  const value = 10000000000
  const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
  console.log(receipt)



  // 구매 완료 후 nft transfer

  let senderPrivateKey = "0xee787cc5b6cb27bc9ff018be6fad5db255a759c62e6170e18a80a282436a3699";
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

    let contractAddr = "0x38463fadccfcd34300ef638c8be7c626bfc87077";

        const KIP_17 = new caver.kct.kip17(contractAddr);

        transferResult = await KIP_17.transferFrom(
          senderKeyring.address,
          "0x5F5c71c26C985dB9CEcc4ba280534F75fdb54220",
          6402386040049111,
          { from: senderKeyring.address, gas: 200000 }
        );
        console.log(transferResult);
    

}

let kipswap_post = async () => {

  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0x126dd02e303ea1f8e1bf91a1ba99f8d06efbc501c40961d718950b29f03abd80"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  // 자기 것의 개인키를 keyring 시키고
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0x126dd02e303ea1f8e1bf91a1ba99f8d06efbc501c40961d718950b29f03abd80"
    );
    caver.wallet.add(singleKeyRing);
  }

  const kip7Instance = new caver.kct.kip7('0x8586822baae5388bf1ee0a6de2e750de80ca063a')
  kip7Instance.name().then(console.log)
  const opts = { from: keyring.address }
  //보낼 account 주소를 입력 시키기
  const recipientAddress = '0xeda67a83f6c1f82f5affdadef2ff6aa81b3d1901'
  const value = 100000000000
  const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
  console.log(receipt)
}
module.exports = {
    mint_nft_post,
    KIP7Token_transfer,
    kipswap_post
}
