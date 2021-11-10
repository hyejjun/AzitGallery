import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";

/* mintNFT */
function MintNftAPI(action) {
    return axios.post(`http://localhost:4000/mint/mintnft`,JSON.stringify(action.data))
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
    return axios.post(`http://localhost:4000/mint/kiptransfer`)
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
    return axios.post(`http://localhost:4000/mint/kipswap`)
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
