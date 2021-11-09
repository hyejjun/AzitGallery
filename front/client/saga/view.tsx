import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 즉시 판매 view 가져오기 */
function directDealAPI(idx){
    return axios.post (`${url}/view/directdeal`,JSON.stringify(idx))
}

function* directDealView(action){      
    const result = yield call(directDealAPI, action.idx)
    const {nick_name, title, description, result_msg, msg} = result.data

    console.log(result.data);

    if(result_msg==="OK"){
        yield put({
            type:'DIRECTDEAL_VIEW_SUCCESS',
            list : result.data
        })
    }else{
        yield put({
            type:'DIRECTDEAL_VIEW_ERROR',
            result_msg,
            msg
        })
    }
    
    
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