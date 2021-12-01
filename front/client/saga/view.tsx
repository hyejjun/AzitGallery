import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 즉시 판매 view 가져오기 */
function directDealAPI(idx){
    return axios.post (`${url}/view/directdeal`,JSON.stringify(idx))
}

function* directDealView(action){      
    const result = yield call(directDealAPI, action.idx)
    const {nick_name, title, description, result_msg, qty, msg} = result.data


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
function auctionViewAPI(idx){
    return axios.post (`${url}/view/auction`,JSON.stringify(idx))
}

function* auctionView(action){
    const result = yield call(auctionViewAPI, action.idx)
    const {nick_name, title, description, result_msg, msg} = result.data

    if(result_msg==="OK"){
        yield put({
            type:'AUCTION_VIEW_SUCCESS',
            list : result.data
        })
    }else{
        yield put({
            type:'AUCTION_VIEW_ERROR',
            result_msg,
            msg
        })
    }
}

function* reqAuctionView(){
    yield takeLatest('AUCTION_VIEW_REQUEST',auctionView)
}

function getMatchQtyAPI(data){
    return axios.post (`${url}/view/getqty`,data.data)
}

function* getMatchQty(data){
    const result = yield call(getMatchQtyAPI, data)
    if(result.data.result_msg=="OK"){
        yield put({
            type:'GET_MATCH_QTY_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'GET_MATCH_QTY_ERROR',
        })

    }

}

function* reqGetMatchQty(){
    yield takeLatest('GET_MATCH_QTY_REQUEST',getMatchQty)
}



function getMatchColorAPI(data){
    return axios.post (`${url}/view/getsize`,data.data)
}

function* getMatchColor(data){
    const result = yield call(getMatchColorAPI, data)
    if(result.data.result_msg=="OK"){
        yield put({
                type:'GET_MATCH_SIZE_SUCCESS',
                data:result.data.result
            })
        }else{
            yield put({
                type:'GET_MATCH_SIZE_ERROR',
            })

        }

}

function* reqGetMatchColor(){
    yield takeLatest('GET_MATCH_SIZE_REQUEST',getMatchColor)
}


export default function* viewSaga(){
    yield all([
        fork(reqDirectDealView),
        fork(reqAuctionView),
        fork(reqGetMatchQty),
        fork(reqGetMatchColor)
    ])
}
