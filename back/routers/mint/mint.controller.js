
  //https://baobab.scope.klaytn.com/account/0xdfaf037869bb807239e8c46d3b3472ac72adbaef?tabId=txList
const option = {
    headers: [
      {
        name: "Authorization",
        //https://console.klaytnapi.com/ko/security/credential 여기서 발급
        value: "Basic " + Buffer.from("KASKXH98VFCXC2FH14VQFVAO" + ":" + "Untq5ayaMInTNPcnASB0Ler-oZx-LI-qa7bbAc0Z").toString("base64"),
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

  // 개인키를 바탕으로 keyring을 생성합니다.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef 여기서 
  // keyring에 대한 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/Caver-js/api-references/Caver.wallet/keyring 를 참고하세요.
  // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  개인키
  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0xbadd3465137bd07ecc73fe38b398a6f922a09885d896afa926fac750eef8269f"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0xbadd3465137bd07ecc73fe38b398a6f922a09885d896afa926fac750eef8269f"
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
         sellerID: 0,
         productID: 'dafdsfdsf',
       });
       // KIP-17.mintWithTokenURI를 이용해서 새로운 토큰을 발행합니다.
       // 자세한 내용은 https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/KIP-17#KIP-17-mintwithtokenuri 를 참고하세요.
       mintResult = await kip_17.mintWithTokenURI(
        // https://baobab.wallet.klaytn.com/access/0xdfaf037869bb807239e8c46d3b3472ac72adbaef  account주소를 넣는다
         "0xfea30a06828cfc5ce4db8d90f2f4ac20c7937019",
         randomTokenID,
         tokenURI,
         { from: keyring.address }
       );
       console.log(mintResult)
     }

}



let KIP7Token_transfer = async () => {


  const keyring = caver.wallet.keyring.createFromPrivateKey(
    "0xbadd3465137bd07ecc73fe38b398a6f922a09885d896afa926fac750eef8269f"
  );
  // wallet에 keyring이 추가되지 않은 경우에만 keyring을 추가합니다.
  // 자기 것의 개인키를 keyring 시키고
  if (!caver.wallet.getKeyring(keyring.address)) {
    const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
      "0xbadd3465137bd07ecc73fe38b398a6f922a09885d896afa926fac750eef8269f"
    );
    caver.wallet.add(singleKeyRing);
  }

  const kip7Instance = new caver.kct.kip7('0xf08d2e35c9cfcecb35224567a953809f81b006c0')
  kip7Instance.name().then(console.log)
  const opts = { from: keyring.address }
  //보낼 account 주소를 입력 시키기
  const recipientAddress = '0x6EE16198C57833ca659dEeb83B1e583AA8A74Ce6'
  const value = 100000000000000000000
  const receipt = await kip7Instance.transfer(recipientAddress, value, opts)
  console.log(receipt)
  
}
module.exports = {
    mint_nft_post,
    KIP7Token_transfer
}