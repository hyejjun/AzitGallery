import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'


function DealAPI(data){
    console.log(data.data)
    return axios.post(`${url}/deal/direct`, data.data)

}
function* reqDealSaga(data){
    const result = yield call(DealAPI,data) 
    console.log(result)
    yield put({
        type:'DIRECT_DEAL_SUCCESS',
        data:result
    })
}

function* reqDeal(){
    yield takeLatest('DIRECT_DEAL_REQUEST',reqDealSaga)
}
export default function* dealsaga(){
    yield all([
        fork(reqDeal)
        
    ])
}