import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";


function dealAPI(data){
    console.log(data.data)
    return axios.post(`http://localhost:4000/deal/direct`, data.data)

}
function* reqDealSaga(data){
    const result = yield call(dealAPI,data) 
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