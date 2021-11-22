import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* mintNFT */

function auctionPriceAPI(data) {
    return axios.post(`http://localhost:4000/auction/auctionprice`, data)
}


function* auctionPriceSaga(action){
    const result = yield call(auctionPriceAPI, action.data)

 
}

function* reqAuctionPrice(){
    yield takeLatest('AUCTION_PRICE_REQUEST',auctionPriceSaga)
}

/* mintNFT */

function auctionCurrentAPI(data) {
    return axios.post(`http://localhost:4000/auction/auctioncurrent`, data)
}


function* auctionCurrentSaga(action){
    const result = yield call(auctionCurrentAPI, action.data)
    // console.log(`여기까지 작도잉 되나?${result.data.endDate}`)
        yield put({
            type:'AUCTION_CURRENT_SUCCESS',
            current:result.data.current,
            endDate:result.data.endDate
        })

 
}

function* reqAuctionCurrent(){
    yield takeLatest('AUCTION_CURRENT_REQUEST',auctionCurrentSaga)
}


/* getBalance */
function getBalanceAPI(data) {
    return axios.post(`${url}/auction/getbalance`,JSON.stringify(data))
}


function* GetBalanceSaga(action){
    const result = yield call(getBalanceAPI, action.data)
    if (result.data.result_msg=="OK"){
        yield put({
            type:'GET_BALANCE_SUCCESS',
            data:result.data.your_balance
        })
    }else{
        yield put({
            type:'GET_BALANCE_ERROR'
        })
    }
}

function* reqGetBalance(){
    yield takeLatest('GET_BALANCE_REQUEST',GetBalanceSaga)
}


export default function* auctionsaga(){
        yield all([
            fork(reqAuctionPrice),
            fork(reqAuctionCurrent),
            fork(reqGetBalance),
        ])

}
