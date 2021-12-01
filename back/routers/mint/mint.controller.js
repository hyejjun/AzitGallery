const { sequelize, User, ItemInfo, ItemDetail, ItemImg, Auction, DirectDeal, AuctionHistory, SubCategory, Nft } = require('../../models')
const express = require('express')
//https://baobab.scope.klaytn.com/account/0xdfaf037869bb807239e8c46d3b3472ac72adbaef?tabId=txList
const option = {
  headers: [
    {
      name: "Authorization",
      //https://console.klaytnapi.com/ko/security/credential 여기서 발급
      value: "Basic " + Buffer.from("KASKX0EA08C6X4X2EJ2VYJJB" + ":" + "vilV-HLyneRjPvTElJrHI4LmBezq5GynX3JIHr36").toString("base64"),
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

let mint_nft_post = async (req, res) => {

  console.log('NFT')

  const { ifSell, price, currency, name, desc, itemType, aucPrice, aucTime, extension, gender, bigCategory, smallCategory, mainImgIdx, totalColorSizeQty, userAddress } = req.body[0]

  let color_all = []
  let size_all = []
  let idx_all = []
  let qty_all = []

  // [ 'red_s_1', 'red_s_2', 'red_s_3', 'blue_m_1', 'blue_m_2' ]
  let nft_all = []

  let color = []
  let size = []

  let nft_color_arr = []
  let nft_size_arr = []

  totalColorSizeQty.map((v, k) => {
    color_all.push(v.color)
    size_all.push(v.size)
    qty_all.push(v.qty)

    for (let i = 0; i < v.qty; i++) {
      nft_all.push(String(`${v.color}_${v.size}_${i + 1}`))
      idx_all.push(`${i}`)
      nft_color_arr.push(v.color)
      nft_size_arr.push(v.size)
    }
  })

  color_all.forEach((element) => {
    if (!color.includes(element)) {
      color.push(element)
    }
  })
  size_all.forEach((element) => {
    if (!size.includes(element)) {
      size.push(element)
    }
  })

  //      bool    str    str       str   str    str      obj     obj   str       str      bool      str      str           str
  // 개인키를 바탕으로 keyring을 생성합니다.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef 여기서 
  // keyring에 대한 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/Caver-js/api-references/Caver.wallet/keyring 를 참고하세요.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  개인키
  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0x6aaf5c8af80503a0737f02f107e7a38ef1474abf32d2c8df0e36ddc53fd8ef97"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0x6aaf5c8af80503a0737f02f107e7a38ef1474abf32d2c8df0e36ddc53fd8ef97"
    );
    caver.wallet.add(singleKeyRing);
  }
  // 넘어온 데이터를 바탕으로 새로운 KIP-17을 배포(=새로운 명품 등록)합니다. 
  const kip17 = await caver.kct.kip17.deploy(
    {
      name: name,
      symbol: 'EPI',
    },
    keyring.address
  );
  //   console.log(kip17)
  //console.log(kip17.options.address);

  // 컨트랙트 주소 기반으로 KIP-17 오브젝트를 생성합니다.
  const kip_17 = new caver.kct.kip17(kip17.options.address);
  // 새로 발행하는 토큰에 임의의 tokenId를 할당하기 위해 Math.random 사용 및 중복 여부를 체크합니다.

  randomTokenID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

  try {
    owner = await kip_17.ownerOf(randomTokenID);
  } catch (e) {
    // owner가 존재하지 않는 경우(=존재하지 않는 tokenID) 에러가 리턴됩니다.
    // 에러를 받으면 해당 tokenID로 토큰 생성이 가능합니다.
    console.log("we can mint");
    // tokenURI에는 임의의 정보를 넣어줄 수 있습니다.
    // 본 예제에서는 임의의 sellerID와 productID를 json 형태로 저장합니다.
    // 토큰 이미지 URL이나 기타 정보를 tokenURI에 저장할 수 있습니다.
    tokenURI = JSON.stringify({
      color: color,
      size: size,

    });
    // KIP-17.mintWithTokenURI를 이용해서 새로운 토큰을 발행합니다.
    // 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/KIP-17#KIP-17-mintwithtokenuri 를 참고하세요.
    mintResult = await kip_17.mintWithTokenURI(
      // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  account주소를 넣는다
      "0x62b8769d6edc718d90cb8884ca7f390e9b9c7466",
      randomTokenID,
      tokenURI,
      { from: keyring.address }
    );
    //console.log(mintResult)
  }
  // 나중에는 creator 도 가져와야함..

  const imagesLink = req.body[1]
  const mainImgLink = req.body[2]
  // console.log("메인 이미지 링크 ====",mainImgLink)
  let sell_type
  ifSell == true ? sell_type = false : sell_type = true
  let data // res.json 리턴용

  try {
    // user_idx 받아오기
    let get_user_id = await User.findOne({
      where: {
        kaikas_address: userAddress
      }
    })
    const { user_idx } = get_user_id.dataValues

    // 받은 id로 item_info table에 추가
    let add_to_item_info = await ItemInfo.create({
      creator: user_idx,
      item_code: `${new Date().getTime()}${smallCategory}`,
      description: desc,
      title: name,
      sell_type,
      size: size.join(','),
      color: color.join(','),
      category_id: bigCategory,
      product_status : 0,
      main_img_link: mainImgLink
    })

    // 대표이미지
    let main_img_link

    // 다시 생각해보기: imagesLink로 for 또는 add to Item으로?
    imagesLink.forEach(async x => {
      await ItemImg.create({
        item_img_idx: add_to_item_info.dataValues.item_id,
        item_img_link: x,
        item_id: add_to_item_info.dataValues.item_id
      })
    })


    // item detail 넣기
    for (let i = 0; i < totalColorSizeQty.length; i++) {
      let add_to_item_detail = await ItemDetail.create({
        item_info_idx: add_to_item_info.dataValues.item_id,
        size: totalColorSizeQty[i].size,
        color: totalColorSizeQty[i].color,
        qty: parseInt(totalColorSizeQty[i].qty),
        product_status: '판매중'
      })
    }


    let item_detail_idx = await ItemDetail.findAll({ where: { item_info_idx: add_to_item_info.dataValues.item_id }, attributes: ['nft_idx', 'qty'] })
    let item_detail_idx_arr = []
    let nft_idx_arr = []
    item_detail_idx.map((v, k) => {
      item_detail_idx_arr.push(v.dataValues.nft_idx)
      for (let i = 0; i < v.dataValues.qty; i++) {
        nft_idx_arr.push(v.dataValues.nft_idx)
      }
    })

    let nft_insert_result = []
    // nft 넣기
    for (let i = 0; i < nft_idx_arr.length; i++) {
      let nft_insert = await Nft.create({
        nft_img_idx: nft_idx_arr[i],
        nft: nft_all[i],
        product_status: '판매중'
      })
      nft_insert_result.push(nft_insert.dataValues)
    }

    // 색과 사이즈 별로 넣기

    let color_size_item = []

    let last_digits_for_detail_arr = []
    for (let i = 0; i < color.length; i++) {
      for (let j = 0; j < size.length; j++) {
        // console.log('sooon', i, j)
        // 색과 사이즈를 00~99로 해서 자릿수를 맞춰준다
        let last_digits_for_detail
        if (i == 0 && j == 0) {
          last_digits_for_detail = `00`
        } else if (i * size.length + j < 10) {
          last_digits_for_detail = `0${i * size.length + j}`
        } else if (i * size.length + j >= 10 || i * size.length + j + 1 < 100) {
          last_digits_for_detail = `${i * size.length + j}`
        }
        // 아래 함수 인자값은 이름, 색상, 사이즈를 바탕으로 토큰 발행을 하기 위함이며
        // idx는 getNFT함수 안에서 item_detail 테이블에서 nft_idx에 맞게 nft값을 업데이트 하기 위함임

        last_digits_for_detail_arr.push(last_digits_for_detail)
      }
    }

    for (let i = 0; i < item_detail_idx_arr.length; i++) {
      await ItemDetail.update({ item_code: `${add_to_item_info.dataValues.item_code}${last_digits_for_detail_arr[i]}` }, { where: { nft_idx: item_detail_idx_arr[i] } })
    }

    for (let i = 0; i < nft_insert_result.length; i++) {
      let colot_nft = nft_color_arr[i]
      let size_nft = nft_size_arr[i]
      let idx_nft = parseInt(idx_all[i]) + 1
      let name_nft = `${name}_${nft_color_arr[i]}_${nft_size_arr[i]}_${idx_nft}`

      setTimeout(() => {
        // 동시에 실행되면 known transaction 오류가 나기 때문에 setTimeout을 통해 딜레이를 줌
        // 500ms정도면 괜찮은 것 같음..
        getNFT(nft_insert_result[i].id, mainImgLink, nft_all, colot_nft, size_nft, idx_nft, name_nft, name)
      }, 500 * i)
    }

    // 일반구매일 때
    if (ifSell == true && get_user_id.length !== 0) {
      // direct deal에 추가하기 -> 경매와 다름
      await DirectDeal.create({
        direct_deal_idx: add_to_item_info.dataValues.item_id,
        price: Number(price),
        currency : 'klay'
      })

      data = {
        result_msg: 'OK',
        msg: 'item 등록 성공'
      }

      res.send(data)
    } else if (ifSell == false && get_user_id.length !== 0) {
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
        currency:'klay'
      })

      data = {
        result_msg: 'OK',
        msg: 'item 등록 성공'
      }
      res.send(data)

    } else {
      // 만에 하나 get_user_id가 없는 경우. 
      // 정상 접근인데 다른 경우가 있는 경우도 추가
      data = {
        result_msg: 'Fail',
        msg: '존재하지 않는 유저입니다. 로그인 상태를 다시 확인해주세요.'
      }
      res.send(data)
    }
  } catch (e) {
    console.log(e)
    data = {
      result_msg: 'Fail',
      msg: e
    }
    res.send(data)
  }
  async function getNFT(idx, link, nft_all, colot_nft, size_nft, idx_nft, name_nft, name) {
    let strname = String(name)
    // let strcolor = String(color)
    // let strsize = String(size)
    let stridx = String(idx_nft)
    let privateKey = "0x6aaf5c8af80503a0737f02f107e7a38ef1474abf32d2c8df0e36ddc53fd8ef97" // DB에서 가져와야 함
    let accountAddress = "0x62B8769D6eDc718d90CB8884cA7F390e9b9C7466"
    console.log('beforeKeyRing')

    // 개인키를 바탕으로 keyring을 생성합니다.
    // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef 여기서 
    // keyring에 대한 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/Caver-js/api-references/Caver.wallet/keyring 를 참고하세요.
    // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  개인키
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

    const kip17 = await caver.kct.kip17.deploy(
      {
        title: strname,
        name: name_nft,
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
        title: strname,
        color: colot_nft,
        size: size_nft,
        idx: stridx
      });
      // KIP-17.mintWithTokenURI를 이용해서 새로운 토큰을 발행합니다.
      // 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/KIP-17#KIP-17-mintwithtokenuri 를 참고하세요.
      mintResult = await kip_17.mintWithTokenURI(
        // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  account주소를 넣는다
        accountAddress,
        randomTokenID,
        tokenURI,
        { from: keyring.address }
      ).then(async (data) => {
        // setTimeout(async () => {
        // address값 떨어지는걸 받아서 덮어씌움. 
        try {

          let nftValue = data.events.Transfer.address
          await Nft.update({
            nft: nftValue
          }, {
            where: {
              id: idx
            }
          })
          // console.log(data.events.Transfer.address)
          // console.log("토큰 아이디 확인하기 ==== ");
          console.log(data.events.Transfer)
        } catch (e) { console.log(e, 'then 안에서') }
        // }, 10);
      })

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

  const kip7Instance = new caver.kct.kip7('0xbd929fed827f26e84ca8b66a35ef694f5829f9de')
  kip7Instance.name().then(console.log)
  const opts = { from: keyring.address }
  //보낼 account 주소를 입력 시키기
  const recipientAddress = '0xadbEC8669bbfBd1481aaD736f98De590d37b26Ce'
  const value = 100000000000
  const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
  console.log(receipt)
}
module.exports = {
  mint_nft_post,
  KIP7Token_transfer,
  kipswap_post
}
