const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory, SubCategory } = require('../../models')

const express = require('express')
//https://baobab.scope.klaytn.com/account/0xdfaf037869bb807239e8c46d3b3472ac72adbaef?tabId=txList
const option = {
    headers: [
        {
            name: "Authorization",
            //https://console.klaytnapi.com/ko/security/credential 여기서 발급
            value: "Basic " + Buffer.from("KASKKDRR6BVLSCRAM4I6PRPS" + ":" + "_uFWVwECedWHBsugbvH9EBMhUbHxKKvXG9covs42").toString("base64"),
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

    const {ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension, gender, bigCategory, smallCategory, mainImgIdx} = req.body[0]
    //      bool    str    str       str   str    str      obj     obj   str       str      bool      str      str           str
    console.log('result line 28',ifSell, price, currency, name, desc, itemType, color, size, aucPrice, aucTime, extension, gender, bigCategory, smallCategory, mainImgIdx)
    const imagesLink = req.body[1]
    const mainImgLink = req.body[2]
    let sell_type
    ifSell == true ? sell_type = false : sell_type = true
    let data // res.json 리턴용

    try{
        // user_idx 받아오기
        let get_user_id = await User.findOne({
            where: {
                user_idx:1// from req.body
        }})

        // 받은 id는 item_info 배열에 추가
        let item_info_arr = []
        console.log()
        let item_info_obj = await ItemInfo.create ({
            creator: get_user_id.dataValues.user_idx, 
            item_code: `${new Date().getTime()}${smallCategory}`, 
            item_id,
            description: desc,
            title: name,
            sell_type,
            size: size.join(','),
            color: color.join(','),
            category_id: bigCategory, 
        })
        item_info_arr.push(item_info_obj)
        console.log(item_info_arr)

        // 대표이미지
        let item_img_arr = []
        let item_img_obj = {}

        imagesLink.forEach(async x=> {
            item_img_obj = {item_img_link: x}
            item_img_arr.push(item_img_obj)
        })

        // 색과 사이즈 별로 넣기
        let color_size_item = []
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
                let add_to_item_detail = await ItemDetail.create({
                    item_info_idx: item_info_obj.dataValues.item_id,
                    size:size[j],
                    color: color[i],
                    nft:`${Number(`${new Date().getTime()}101`)}${size[j]}${color[i]}`, //임시로
                    item_code:`${item_info_obj.dataValues.item_code}${last_digits_for_detail}`,
                    product_status:'ready' //임시로
                })    
                // 아래 함수 인자값은 이름, 색상, 사이즈를 바탕으로 토큰 발행을 하기 위함이며
                // idx는 getNFT함수 안에서 item_detail 테이블에서 nft_idx에 맞게 nft값을 업데이트 하기 위함임
                color_size_item.push({
                    idx: add_to_item_detail.dataValues.nft_idx, 
                    name: name,
                    color: color[i],
                    size: size[j]
                })
            }

        }  

        
        let next_step_test
        async function nft_working(){
            for(let i = 0; i<color_size_item.length; i++){
                setTimeout(()=>{
                    // 동시에 실행되면 known transaction 오류가 나기 때문에 setTimeout을 통해 딜레이를 줌
                    // 500ms정도면 괜찮은 것 같음..
                    getNFT(color_size_item[i].name, color_size_item[i].color, color_size_item[i].size, color_size_item[i].idx, mainImgLink)
                    if(getNFT(color_size_item[i].name, color_size_item[i].color, color_size_item[i].size, color_size_item[i].idx, mainImgLink) == true){
                        next_step_test = true 
                    } else{
                        next_step_test = false 
                    }
                },500*i)
            }
        }

        nft_working().then(async data=>{
            if(next_step_test == true){
                sell_auc()
            } else{
                data = {
                    result_msg: 'Fail',
                    msg: '잔액이 충분하지 않습니다.',
                    where: '잔액부족'
                }
                console.log('잔액부족 send')
                res.json(data)
            }
        })
        async function sell_auc(){
            // 일반구매일 때
            if(ifSell == true && get_user_id.length !== 0){
                // direct deal에 추가하기 -> 경매와 다름
                await DirectDeal.create({
                    direct_deal_idx: item_info_obj.dataValues.item_id,
                    price: Number(price),
                    currency
                })

                data = {
                    result_msg: 'OK',
                    msg: 'item 등록 성공',
                    where: '일반구매'
                }
                console.log('일반구매 send')
                res.send(data)
            } else if( ifSell == false && get_user_id.length !== 0){
                //경매일 때
                // 경매 테이블에 데이터 넣기...
                
                await Auction.create({
                    auction_idx: item_info_obj.dataValues.item_id,
                    end_date: aucTime,
                    if_extended: extension,
                })

                // 경매 히스토리 최상단에도 넣어주어야 함
                await AuctionHistory.create({
                    auc_history_idx: item_info_obj.dataValues.item_id,
                    bidder: get_user_id.dataValues.user_idx,
                    bid_price: Number(aucPrice),
                    currency
                })
                
                data = {
                    result_msg: 'OK',
                    msg: 'item 등록 성공',
                    where:'경매시'
                }
                console.log('경매 send')
                res.send(data)

            } else{
                // 만에 하나 get_user_id가 없는 경우. 
                // 정상 접근인데 다른 경우가 있는 경우도 추가
                data = {
                    result_msg: 'Fail',
                    msg: '존재하지 않는 유저입니다. 로그인 상태를 다시 확인해주세요.',
                    where: '유저없음'
                }
                console.log('예외 send')
                res.send(data)
            }
        }
    } catch(e){
        console.log(e)
        data = {
            result_msg: 'Fail',
            msg: e,
            where: '유저오류'
        }
        console.log('유저가없음 send')
        res.send(data) 
    }

    //주석이 너무 길어 맨 아래에 따로 빼놓겠습니다
    async function getNFT(name, color, size, idx, link){
        let strname = String(name)
        let strcolor = String(color)
        let strsize = String(size)
        let privateKey = "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b" // DB에서 가져와야 함
        let accountAddress = "0x89e204fcbad4c4197a9e3971c7bb3c32f46cc458"
  
        const keyring = caver.wallet.keyring.createFromPrivateKey(
            privateKey
        );
        // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.

        if (!caver.wallet.getKeyring(keyring.address)) {
            const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
                privateKey
            );
            caver.wallet.add(singleKeyRing);
        }
        // 넘어온 데이터를 바탕으로 새로운 KIP-17을 배포(=새로운 명품 등록)합니다. 
        let kip17
        let next_step
        try{
            kip17 = await caver.kct.kip17.deploy(
                {
                name: `${strname}${strcolor}${strsize}`,
                symbol: 'EPI',
                },
                keyring.address
            )
            next_step = true
        } catch(e){
            let crop_error = e.toString().substr(23,42)
            if(crop_error == "insufficient funds of the sender for value"){
                next_step = false
                return false
            }
        }
        // 컨트랙트 주소 기반으로 KIP-17 오브젝트를 생성합니다.
        if(next_step == true){
            const kip_17 = new caver.kct.kip17(kip17.options.address);
            // 새로 발행하는 토큰에 임의의 tokenId를 할당하기 위해 Math.random 사용 및 중복 여부를 체크합니다.
            randomTokenID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);  
            try {
                console.log('try')
                owner = await kip_17.ownerOf(randomTokenID);
            } catch (e) {
                console.log('catch')
                // owner가 존재하지 않는 경우(=존재하지 않는 tokenID) 에러가 리턴됩니다. -> 정상적인 경우
                console.log("we can mint");
                // tokenURI에는 임의의 정보를 넣어줄 수 있어 토큰 이미지 URL이나 기타 정보를 tokenURI에 저장할 수 있습니다.
                tokenURI = JSON.stringify({
                    name: strname,
                    color: strcolor,
                    size: strsize,
                    link: link
                });
                // KIP-17.mintWithTokenURI를 이용해서 새로운 토큰을 발행합니다.
                mintResult = await kip_17.mintWithTokenURI(
                    // account주소를 넣는다
                    accountAddress,
                    randomTokenID,
                    tokenURI,
                    { from: keyring.address }
                ).then(async (data)=>{
                    let nftValue = data.events.Transfer.address
                    await ItemDetail.update({nft: nftValue},
                        {where:{nft_idx:idx}})
                    console.log(data.events.Transfer.address)
                    return true
                })            
            }
        } else{

            return false
        }
    }
}

let KIP7Token_transfer = async () => {

  // 해당 토큰으로 구매하기

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



  // 구매 완료 후 nft transfer

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

let kipswap_post = async () => {

  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381zf3afd312e79ff45f122b"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  // 자기 것의 개인키를 keyring 시키고
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0x07ea3560faca009fdbaf6cee2ea6ee87aaf22bd1f381f3afd312e79ff45f122b"
    );
    caver.wallet.add(singleKeyRing);
  }

  const kip7Instance = new caver.kct.kip7('0xbd929fed827f26e84ca8b66a35ef694f5829f9de')
  kip7Instance.name().then(console.log)
  const opts = { from: keyring.address }
  const recipientAddress = '0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce'
  const value = 100000000000
  const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
  console.log(receipt)
}

const klaytn_test = async (req, res) => {
    // let data = await caver.rpc.klay.fromPeb(caver.rpc.klay.getBalance("0x89e204fcbad4c4197a9e3971c7bb3c32f46cc458"), "KLAY")

    // function hex(value){
    //     return parseInt(value, 16)
    // }
    // //privateKey = 0xb6a4306091a3f4203b497cf461f22624f372c3cffe31d8c0f874ef75a7d1881f
    accAddress =  "0x54e034470aB35768C24607Bb847870D776E10DE4"
    // let getBal = await caver.rpc.klay.getBalance(accAddress)
    let getAcc = await caver.rpc.klay.getAccount("0x54e034470aB35768C24607Bb847870D776E10DE4")
    // /* getAcc 리턴 예시
    // {
    //     accType: 1,
    //     account: {
    //     nonce: 112,
    //     balance: '0xbae2fdb76a9200', // getBal의 리턴값, hex함수 이용하면 52603925000000000와 같은 값이 나옴
    //     humanReadable: false,
    //     key: { keyType: 1, key: {} }
    // }
    // */

    console.log(hex(data))
    console.log(data)
    // // 0xbae2fdb76a9200 값의 의미?
    let resData = hex(data)
    
    res.send(resData.toString())
}
module.exports = {
    mint_nft_post,
    KIP7Token_transfer,
    kipswap_post,
    klaytn_test,
}

