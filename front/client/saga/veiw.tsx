import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 즉시 판매 view 가져오기 */
function directDealAPI(){
    return axios.get (`${url}/view/directdeal`)
}

function* directDealView(){  
    const result = yield call(directDealAPI)
    console.log(result);
    
}

function* reqDirectDealView(){
    yield takeLatest('DIRECTDEAL_VIEW_REQUEST',directDealView)
}


/* 경매 view 가져오기 */
function auctionViewAPI(){
    return axios.get (`${url}/view/auction`)
}

function* auctionView(){
    const result = yield call(auctionViewAPI)
}

function* reqAuctionView(){
    yield takeLatest('AUCTION_VIEW_REQUEST',auctionView)
}



export default function* viewSaga(){
    yield all([
        fork(reqDirectDealView),
        fork(reqAuctionView)
    ])
}
