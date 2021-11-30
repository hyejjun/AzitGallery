const config = require('./config');
const accessKeyId = config.accessKeyId;
const secretAccessKey = config.secretAccessKey;
const authorization = config.authorization;
const caver = config.caver;
const developerKey = config.developerKey;


const keyring = caver.wallet.keyring.createFromPrivateKey(developerKey);
if (!caver.wallet.getKeyring(keyring.address)) {
  const singleKeyRing = caver.wallet.keyring.createFromPrivateKey(
    developerKey
  );
  caver.wallet.add(singleKeyRing);
}


const KIP7token = async () => {
  const kip7 = await caver.kct.kip7.deploy(
    {
      name: 'Perro',
      symbol: 'PRR',
      decimals: 18,
      initialSupply: '80000000000000000000000000',
    },
    keyring.address
  )
}

const send_Token = async (recipient, amount) => {
  const kip7Instance = new caver.kct.kip7(process.env.token_address)
  const opts = { from: keyring.address }
  //보낼 account 주소를 입력 시키기
  const num = "1000000000000000000"
  const value = `${Number(amount) * Number(num)}`;
  const receipt = await kip7Instance.transfer(recipient, value, opts)
  .then(()=>{
    return true
  })
  .catch(() => {
    console.log('receipt_error')
    return false
  })
  return receipt
}


const send_Klay = async (recipient, amount) => {
  const lt = await caver.transaction.legacyTransaction.create({
    from: keyring.address,
    to: recipient,
    value: caver.utils.toPeb(amount, 'KLAY'),
    gas: 25000,
  })

  const signed = await caver.wallet.sign(keyring.address, lt)
    .catch(() => {
      console.log('sign_error')
      return false
    })
  const receipt = await caver.rpc.klay.sendRawTransaction(signed)
  .then(()=>{
    return true
  })  
  .catch(() => {
      console.log('traction_error')
      return false
    })
  return receipt

}


const sendKlay = async (recipient, amount) => {

  let data = {
    success:false,
    receipt:null,
    error:null
  }

  try{
    const lt = await caver.transaction.legacyTransaction.create({
      from: keyring.address,
      to: recipient,
      value: caver.utils.toPeb(amount, 'KLAY'),
      gas: 25000,
    })
    try{
      const signed = await caver.wallet.sign(keyring.address, lt)
      try{
        const receipt = await caver.rpc.klay.sendRawTransaction(signed)
        data.success=true;
      data.receipt=receipt;
      return data;

      }catch(e){
        data.error=e;
      return data;
      }
    }catch(e){
      data.error=e;
      return data;
    }
  }catch(e){
    data.error=e;
    return data;
  }
}


const mintNFT = async(contractAddr,tokenID,tokenURI,toAddr)=>{

  const kip17 = new caver.kct.kip17(contractAddr);
  const mintResult = await kip17.mintWithTokenURI(
    toAddr,
    tokenID,
    tokenURI,
    { from: keyring.address
    }
  )

  return mintResult; 
}




module.exports = {
  send_Token,
  send_Klay,
  sendKlay,
  mintNFT
}

