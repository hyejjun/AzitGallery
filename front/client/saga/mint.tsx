import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";


function* MintNftSaga(action){
    const result = yield call(axios.post,`http://localhost:4000/mint/mintnft`,JSON.stringify(action.data))

    yield put({
        type:'MINT_NFT_RETURN',
        verify:5000
    })  
}

function* KipTokenSaga(){
    const result = yield call(axios.post,`http://localhost:4000/mint/kiptransfer`)

    yield put({
        type:'MINT_NFT_RETURN',
        verify:5000
    })  
}

function* KipSwapSaga(){
    const result = yield call(axios.post,`http://localhost:4000/mint/kipswap`)

 
}

function* watchMint(){
    yield takeLatest('MINT_NFT_SUCCESS',MintNftSaga)
    yield takeLatest('KIP_TOKEN_SUCCESS',KipTokenSaga)
    yield takeLatest('KIP_SWAP_REQUEST',KipSwapSaga)
}

export default function* MintSaga(){
    yield all([
        fork(watchMint)
    ])
}
