import { ConstructionOutlined } from '@mui/icons-material';
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
        data:result.data.ARR,

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

/* mynft 구매자 판매자 뷰 나누기 */
function mynftviewAPI(action){
    return axios.post(`http://localhost:4000/list/mynftview`,JSON.stringify(action.data))
}
function* mynftviewsaga(action){
    console.log(action);
    const result = yield call(mynftviewAPI,action)
    yield put({
        type:'MYNFT_VIEW_SUCCESS',
        data:result.data
    })
}

function* reqmynftview(){
    yield takeLatest('MYNFT_VIEW_REQUEST',mynftviewsaga)
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
    console.log(`saga 까지 작동 여부 ${result.data.Pluslength}`)
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
/* 구매한 nft 조회수 순으로 가져오기  */
function getmynftbyhitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/mynftbyhits',{userAddress:userAddress,likeState:likeState})

}
function* getmynftbyhitsSaga(data){
    const result = yield call(getmynftbyhitsAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'HITS_BUY_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'HITS_BUY_ERROR',
        })
    } 
}

function* reqmynftbyhits(){
    yield takeLatest('HITS_BUY_REQUEST',getmynftbyhitsSaga)
}

/* 판매된 nft 조회수 순으로 가져오기  */
function getsellnftbyhitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/sellnftbyhits',{userAddress:userAddress,likeState:likeState})

}

function* getsellnftbyhitsSaga(data){
    const result = yield call(getsellnftbyhitsAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'HITS_SELL_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'HITS_SELL_ERROR',
        })
    } 
}

function* reqsellnftbyhits(){
    yield takeLatest('HITS_SELL_REQUEST',getsellnftbyhitsSaga)
}

/* 미판매된 nft 조회수 순으로 가져오기  */
function getnotsellnftbyhitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/notsellnftbyhits',{userAddress:userAddress,likeState:likeState})

}

function* getnotsellnftbyhitsSaga(data){
    const result = yield call(getnotsellnftbyhitsAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'HITS_NOT_SELL_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'HITS_NOT_SELL_ERROR',
        })
    } 
}

function* reqnotsellnftbyhits(){
    yield takeLatest('HITS_NOT_SELL_REQUEST',getnotsellnftbyhitsSaga)
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
            fork(reqnotsellnft),
            fork(reqmynftbyhits),
            fork(reqsellnftbyhits),
            fork(reqnotsellnftbyhits),
            fork(reqmynftview)
        ])
}
