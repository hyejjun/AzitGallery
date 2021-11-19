import { ConstructionOutlined } from '@mui/icons-material';
import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call, takeLeading} from "redux-saga/effects";

/* 일반 */

function listItemAPI() {
    return axios.get(`http://localhost:4000/list/alllist`)
}

function* listItemSaga(){
    const result = yield call(listItemAPI)

    yield put({
        type:'ITEM_LIST_SUCCESS',
        data:result.data.ARR,

    })
}

function* reqListItem(){
    yield takeLatest('ITEM_LIST_REQUEST',listItemSaga)
}


function plusListItemAPI(action) {
    return axios.post(`http://localhost:4000/list/pluslist`,JSON.stringify(action.data))
}

function* plusListItemSaga(action){
    const result = yield call(plusListItemAPI,action)
   
    yield put({
        type:'PLUS_ITEM_LIST_SUCCESS',
        data:result.data.ARR,
        Pluslength:result.data.Pluslength
    })
}

function* reqPlusListItem(){
    yield takeLatest('PLUS_ITEM_LIST_REQUEST',plusListItemSaga)
}

/* mynft 구매자 판매자 뷰 나누기 */
function mynftviewAPI(action){
    return axios.post(`http://localhost:4000/list/mynftview`,JSON.stringify(action.data));
}
function* mynftviewsaga(action){
    const result = yield call(mynftviewAPI,action)
    yield put({
        type:'MYNFT_VIEW_SUCCESS',
        data:result.data
    })
}

function* reqmynftview(){
    yield takeLeading('MYNFT_VIEW_REQUEST',mynftviewsaga)
}


/* 경매 */

function listAuctionAPI() {
    return axios.get(`http://localhost:4000/list/allauction`)
}

function* lisAuctionSaga(){
    const result = yield call(listAuctionAPI)
   
    yield put({
        type:'ITEM_AUCTION_SUCCESS',
        data:result.data.ARR
    })
}

function* reqAuctionItem(){
    yield takeLatest('ITEM_AUCTION_REQUEST',lisAuctionSaga)
}


function plusAuctionItemAPI(action) {
    return axios.post(`http://localhost:4000/list/plusauction`,JSON.stringify(action.data))
}

function* plusAuctionItemSaga(action){
    const result = yield call(plusAuctionItemAPI,action)
    console.log(`saga 까지 작동 여부 ${result.data.Pluslength}`)
    yield put({
        type:'PLUS_AUCTION_LIST_SUCCESS',
        data:result.data.ARR,
        Pluslength:result.data.Pluslength
    })
}

function* reqPlusAuctionItem(){
    yield takeLatest('PLUS_AUCTION_LIST_REQUEST',plusAuctionItemSaga)
}



/* query  */

function queryItemAPI(action) {
    return axios.post(`http://localhost:4000/list/queryitem`,JSON.stringify(action.data))
}

function* queryItemSaga(action){
    const result = yield call(queryItemAPI,action.dadta)
   
    yield put({
        type:'SET_QUERY_SUCCESS',
        data:result.data.ARR
    })
}

function* reqQueryItem(){
    yield takeLatest('SET_QUERY_REQUEST',queryItemSaga)
}

/* 구매한 nft가져오기  */
function getMyNftAPI(data){
    return axios.post(`http://localhost:4000/list/mynftall`,JSON.stringify(data.data))
}

function* getMyNftSaga(data){    

    const result = yield call(getMyNftAPI,data)
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

function* reqMyNftAll(){
    yield takeLatest('MY_NFT_ALL_REQUEST',getMyNftSaga)
}

/* 판매한 nft가져오기  */
function getSoldNftAPI(data){
    return axios.post('http://localhost:4000/list/soldnft',JSON.stringify(data.data))
}

function* getSoldNftSaga(data){
    const result = yield call(getSoldNftAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'SOLD_NFT_SUCCESS',
            data:result.data.result
        })
    }else{
        console.log('err')
    }
}

function* reqSoldNft(){
    yield takeLatest('SOLD_NFT_REQUEST',getSoldNftSaga)
}


/* 미판매된 nft가져오기  */
function getNotSellNftAPI(data){
    return axios.post('http://localhost:4000/list/notsellnft',JSON.stringify(data.data))
}

function* getNotSellNftSaga(data){

    const result = yield call(getNotSellNftAPI,data)
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

function* reqNotSellNft(){
    yield takeLatest('NOT_SELLED_REQUEST',getNotSellNftSaga)
}
/* 구매한 nft 조회수 순으로 가져오기  */
function getMyNftByHitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/mynftbyhits',{userAddress:userAddress,likeState:likeState})

}
function* getMyNftByHitsSaga(data){
    const result = yield call(getMyNftByHitsAPI,data)
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

function* reqMyNftByHits(){
    yield takeLatest('HITS_BUY_REQUEST',getMyNftByHitsSaga)
}

/* 판매된 nft 조회수 순으로 가져오기  */
function getSellNftByHitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/sellnftbyhits',{userAddress:userAddress,likeState:likeState})

}

function* getSellNftByHitsSaga(data){
    const result = yield call(getSellNftByHitsAPI,data)
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

function* reqSellNftByHits(){
    yield takeLatest('HITS_SELL_REQUEST',getSellNftByHitsSaga)
}

/* 미판매된 nft 조회수 순으로 가져오기  */
function getNotSellNftByHitsAPI(data){
    let userAddress = JSON.stringify(data.data.userAddress)
    let likeState = data.data.likeBtn
    return axios.post('http://localhost:4000/list/notsellnftbyhits',{userAddress:userAddress,likeState:likeState})

}

function* getNotSellNftByHitsSaga(data){
    const result = yield call(getNotSellNftByHitsAPI,data)
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

function* reqNotSellNftByHits(){
    yield takeLatest('HITS_NOT_SELL_REQUEST',getNotSellNftByHitsSaga)
}

export default function* MintSaga(){
        yield all([
            fork(reqListItem),
            fork(reqPlusListItem),
            fork(reqAuctionItem),
            fork(reqPlusAuctionItem),
            fork(reqQueryItem),
            fork(reqMyNftAll),
            fork(reqSoldNft),
            fork(reqNotSellNft),
            fork(reqMyNftByHits),
            fork(reqSellNftByHits),
            fork(reqNotSellNftByHits),
            fork(reqmynftview)
        ])
}
