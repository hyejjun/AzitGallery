import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";

/* 일반 */

function listitemAPI() {
    return axios.get(`http://localhost:4000/list/alllist`)
}

function* listitemSaga(){
    const result = yield call(listitemAPI)
   
    yield put({
        type:'ITEM_LIST_SUCCESS',
        data:result.data.ARR
    })
}

function* reqlistitem(){
    yield takeLatest('ITEM_LIST_REQUEST',listitemSaga)
}


function pluslistitemAPI(action) {
    return axios.post(`http://localhost:4000/list/pluslist`,JSON.stringify(action.data))
}

function* pluslistitemSaga(action){
    const result = yield call(pluslistitemAPI,action)
   
    yield put({
        type:'PLUS_ITEM_LIST_SUCCESS',
        data:result.data.ARR,
        Pluslength:result.data.Pluslength
    })
}

function* reqpluslistitem(){
    yield takeLatest('PLUS_ITEM_LIST_REQUEST',pluslistitemSaga)
}


/* 경매 */

function listauctionAPI() {
    return axios.get(`http://localhost:4000/list/allauction`)
}

function* lisauctionSaga(){
    const result = yield call(listauctionAPI)
   
    yield put({
        type:'ITEM_AUCTION_SUCCESS',
        data:result.data.ARR
    })
}

function* reqauctionitem(){
    yield takeLatest('ITEM_AUCTION_REQUEST',lisauctionSaga)
}


function plusauctionitemAPI(action) {
    return axios.post(`http://localhost:4000/list/plusauction`,JSON.stringify(action.data))
}

function* plusauctionitemSaga(action){
    const result = yield call(plusauctionitemAPI,action)
   
    yield put({
        type:'PLUS_AUCTION_LIST_SUCCESS',
        data:result.data.ARR,
        Pluslength:result.data.Pluslength
    })
}

function* reqplusauctionitem(){
    yield takeLatest('PLUS_AUCTION_LIST_REQUEST',plusauctionitemSaga)
}



/* query  */

function queryitemAPI(action) {
    return axios.post(`http://localhost:4000/list/queryitem`,JSON.stringify(action.data))
}

function* queryitemSaga(action){
    const result = yield call(queryitemAPI,action.dadta)
   
    yield put({
        type:'SET_QUERY_SUCCESS',
        data:result.data.ARR
    })
}

function* reqqueryitem(){
    yield takeLatest('SET_QUERY_REQUEST',queryitemSaga)
}


function getmynftAPI(data){
    console.log(data,'getmynftapi')
    return axios.post(`http://localhost:4000/list/mynftall`,JSON.stringify(data.data))
}

function* getmynftSaga(data){    
    const result = yield call(getmynftAPI,data)
    console.log(result)
    yield put({
        type:'MY_NFT_ALL_SUCCESS',
        //data:result,
        data:result
    })
}

function* reqmynftall(){
    console.log('datareq_saga')
    yield takeLatest('MY_NFT_ALL_REQUEST',getmynftSaga)
}

export default function* MintSaga(){
        yield all([
            fork(reqlistitem),
            fork(reqpluslistitem),
            fork(reqauctionitem),
            fork(reqplusauctionitem),
            fork(reqqueryitem),
            fork(reqmynftall)
        ])
}
