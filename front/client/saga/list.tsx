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

/* 구매한 nft가져오기  */
function getmynftAPI(data){
    return axios.post(`http://localhost:4000/list/mynftall`,JSON.stringify(data.data))
}

function* getmynftSaga(data){    

    const result = yield call(getmynftAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'MY_NFT_ALL_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'MY_NFT_ALL_ERROR',
        })
    }
}

function* reqmynftall(){
    yield takeLatest('MY_NFT_ALL_REQUEST',getmynftSaga)
}

/* 판매한 nft가져오기  */
function getsoldnftAPI(data){
    return axios.post('http://localhost:4000/list/soldnft',JSON.stringify(data.data))
    

}

function* getsoldnftSaga(data){
    
    const result = yield call(getsoldnftAPI,data)
    console.log(result,'result')
    if(result.data.result_msg=='OK'){
        yield put({
            type:'SOLD_NFT_SUCCESS',
            data:result.data.result
        })
    }else{
        console.log('err')
    }
}

function* reqsoldnft(){
    yield takeLatest('SOLD_NFT_REQUEST',getsoldnftSaga)
}


/* 미판매된 nft가져오기  */
function getnotsellnftAPI(data){
    return axios.post('http://localhost:4000/list/notsellnft',JSON.stringify(data.data))
}

function* getnotsellnftSaga(data){

    const result = yield call(getnotsellnftAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'NOT_SELLED_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'NOT_SELLED_ERROR',
        })
    }
}

function* reqnotsellnft(){
    yield takeLatest('NOT_SELLED_REQUEST',getnotsellnftSaga)
}

export default function* MintSaga(){
        yield all([
            fork(reqlistitem),
            fork(reqpluslistitem),
            fork(reqauctionitem),
            fork(reqplusauctionitem),
            fork(reqqueryitem),
            fork(reqmynftall),
            fork(reqsoldnft),
            fork(reqnotsellnft)
        ])
}
