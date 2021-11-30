import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 경매 가격 */

function AuctionPriceAPI(data) {
    return axios.post(`${url}/auction/auctionprice`, data)
}


function* AuctionPriceSaga(action){
    const result = yield call(AuctionPriceAPI, action.data)
}

function* reqAuctionPrice(){
    yield takeLatest('AUCTION_PRICE_REQUEST',AuctionPriceSaga)
}

/* 경매 참여 */

function AuctionCurrentAPI(data) {
    return axios.post(`${url}/auction/auctioncurrent`, data)
}


function* AuctionCurrentSaga(action){
    const result = yield call(AuctionCurrentAPI, action.data)    
        yield put({
            type:'AUCTION_CURRENT_SUCCESS',
            current:result.data.current,
            endDate:result.data.endDate,
            buyer:result.data.buyer,
            prevWallet : result.data.prev_bidder,
            prevAmount : result.data.prev_price,
        })
}

function* reqAuctionCurrent(){
    yield takeLatest('AUCTION_CURRENT_REQUEST',AuctionCurrentSaga)
}



/* 경매 마감 */

function AuctionCloseAPI(data) {
    return axios.post(`${url}/auction/auctionclose`, data)
}


function* AuctionCloseSaga(action){    
    const result = yield call(AuctionCloseAPI, action.data)
}

function* reqAuctionClose(){
    yield takeLatest('AUCTION_CLOSE_REQUEST',AuctionCloseSaga)
}

export default function* auctionsaga(){
        yield all([
            fork(reqAuctionPrice),
            fork(reqAuctionCurrent),
            fork(reqAuctionClose),
        ])

}
