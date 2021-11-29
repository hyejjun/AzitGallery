import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'
/* mintNFT */
function MintNftAPI(action) {
    let {data} = action
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

        await axios.post(`${url}/mint/mintnft`,[data[0],fileArr, mainImgLink])
    })
}

function* MintNftSaga(action){
    const result = yield call(MintNftAPI,action)

    yield put({
        type:'MINT_NFT_SUCCESS',
        verify:5000
    })  
}

function* reqMintNft(){
    yield takeLatest('MINT_NFT_REQUEST',MintNftSaga)
}

/* mintNFT */

function KipTokenAPI() {
    return axios.post(`${url}/mint/kiptransfer`)
}

function* KipTokenSaga(){
    const result = yield call(KipTokenAPI)

    yield put({
        type:'KIP_TOKEN_SUCCESS',
        verify:5000
    })  
}

function* reqKipToken(){
    yield takeLatest('KIP_TOKEN_REQUEST',KipTokenSaga)
}

/* mintNFT */

function KipSwapAPI() {
    return axios.post(`${url}/mint/kipswap`)
}


function* KipSwapSaga(){
    const result = yield call(KipSwapAPI)

 
}

function* reqKipSwap(){
    yield takeLatest('KIP_SWAP_REQUEST',KipSwapSaga)
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
