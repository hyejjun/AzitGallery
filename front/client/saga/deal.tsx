import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import { isRegExp } from 'util/types';
import {url} from './url'





function DealAPI(data){
    return axios.post(`${url}/deal/direct`, data.data) 
}
function* reqDealSaga(data){
    
    const result = yield call(DealAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'DIRECT_DEAL_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'DIRECT_DEAL_ERROR'
        })
    }


}

function* reqDeal(){
    yield takeLatest('DIRECT_DEAL_REQUEST',reqDealSaga)
}
export default function* dealsaga(){
    yield all([
        fork(reqDeal)
        
    ])
}