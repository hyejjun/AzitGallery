import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'
/* mintNFT */

function MintNftAPI(action) {
    console.log('here is mint api action',action.data)

    let data = action.data
    console.log(data,'here is mint apiiiiiiiiiiiiiiiiii')
    let mainImgLink
    // s3에서 리턴받은 주소를 넣을 배열
    let fileArr = []
    // 이미지를 배열에 넣는 함수
    async function putImagesLink(){
        // data[1]의 파일들을 s3에 각각 올리고 업로드 주소값을 받아 배열에 넣는다
        let fileArray = data[1].map(async (items, key)=>{
            const response = await fetch(`${url}/item/uploadpics`)
            const { link } = await response.json()
            await fetch(link, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: items
            })
            const imageURL = link.split('?')[0];
            fileArr.push(imageURL)
            if(key == data[0].mainImgIdx){
                mainImgLink = imageURL
            }
        })
        // 모든 파일에 대해 값을 받아온 뒤 시행한다
        await Promise.all(fileArray)
    }
    // then으로 강제로 await을 시켜 전송

    putImagesLink().then(async x=>{
        let result =  await axios.post(`${url}/mint/mintnft`,[data[0],fileArr, mainImgLink])
        console.log(result)
        return result
    })
}

function* MintNftSaga(action){
    console.log('mint saga왔어??')
    let result = yield call(MintNftAPI,action)
    console.log(result.data,'mintnftsaga')
   
}

function* reqMintNft(){
    console.log('here is reqmint')
    yield takeLatest('MINT_NFT_REQUEST',MintNftSaga)
}

/* mintNFT */

function kipTokenAPI() {
    return axios.post(`http://localhost:4000/mint/kiptransfer`)
}

function* kipTokenSaga(){
    const result = yield call(kipTokenAPI)

    yield put({
        type:'KIP_TOKEN_SUCCESS',
        verify:5000
    })  
}

function* reqKipToken(){
    yield takeLatest('KIP_TOKEN_REQUEST',kipTokenSaga)
}

/* mintNFT */

function kipSwapAPI() {
    return axios.post(`http://localhost:4000/mint/kipswap`)
}


function* kipSwapSaga(){
    const result = yield call(kipSwapAPI)

 
}

function* reqKipSwap(){
    yield takeLatest('KIP_SWAP_REQUEST',kipSwapSaga)
}

export default function* MintSaga(){
    try 
    {
        yield all([
            fork(reqMintNft),
            fork(reqKipToken),
            fork(reqKipSwap),
        ])
    } catch (e) { /* ignore */ }
}
