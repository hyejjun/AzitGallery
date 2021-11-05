const { User, ItemDetail } = require('../../models')

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
    console.log('NFT')
    let key = Object.keys(req.body)
    let keyObject = JSON.parse(key)
    console.log(keyObject)
    const color = String(keyObject.color)
    const size = String(keyObject.size)

  // 개인키를 바탕으로 keyring을 생성합니다.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef 여기서 
  // keyring에 대한 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/Caver-js/api-references/Caver.wallet/keyring 를 참고하세요.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  개인키
  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0xee787cc5b6cb27bc9ff018be6fad5db255a759c62e6170e18a80a282436a3699"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0xee787cc5b6cb27bc9ff018be6fad5db255a759c62e6170e18a80a282436a3699"
    );
    caver.wallet.add(singleKeyRing);
  }
  // 넘어온 데이터를 바탕으로 새로운 KIP-17을 배포(=새로운 명품 등록)합니다. 
  const kip17 = await caver.kct.kip17.deploy(
    {
      name: 'EPITEOM',
      symbol: 'EPI',
    },
    keyring.address
  );
//   console.log(kip17)
  console.log(kip17.options.address);

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
         "0xeda67a83f6c1f82f5affdadef2ff6aa81b3d1901",
         randomTokenID,
         tokenURI,
         { from: keyring.address }
       );
       console.log(mintResult)
     }

     let result = await ItemDetail.create({size:size,color:color,nft:0,qty:1,item_code:0})
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

  let senderPrivateKey = "0x126dd02e303ea1f8e1bf91a1ba99f8d06efbc501c40961d718950b29f03abd80";
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
          "0xEDA67a83F6c1F82F5affdADEf2fF6aa81B3D1901",
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