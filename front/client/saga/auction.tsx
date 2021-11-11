import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* mintNFT */

function AuctionPriceAPI(data) {
    return axios.post(`http://localhost:4000/auction/auctionprice`, data)
}


function* AuctionPriceSaga(action){
    const result = yield call(AuctionPriceAPI, action.data)

 
}

function* reqAuctionPrice(){
    yield takeLatest('AUCTION_PRICE_REQUEST',AuctionPriceSaga)
}

/* mintNFT */

function AuctionCurrentAPI(data) {
    return axios.post(`http://localhost:4000/auction/auctioncurrent`, data)
}


function* AuctionCurrentSaga(action){
    const result = yield call(AuctionCurrentAPI, action.data)
    console.log(`여기까지 작도잉 되나?${result.data.endDate}`)
        yield put({
            type:'AUCTION_CURRENT_SUCCESS',
            current:result.data.current,
            endDate:result.data.endDate
        })

 
}

function* reqAuctionCurrent(){
    yield takeLatest('AUCTION_CURRENT_REQUEST',AuctionCurrentSaga)
}

export default function* auctionsaga(){
        yield all([
            fork(reqAuctionPrice),
            fork(reqAuctionCurrent)
        ])

}