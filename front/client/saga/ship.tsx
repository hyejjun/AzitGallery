import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 구매자 :  배송 정보 입력하기 */
function shipAPI(data){
    return axios.post (`${url}/ship/shipinfo`,data)
}

function* shipInfo(action){  
    const result = yield call(shipAPI, action.data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'SHIPINFO_INSERT_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'SHIPINFO_INSERT_ERROR'
        })
    }
    
}

function* reqShip(){
    yield takeLatest('SHIPINFO_INSERT_REQUEST',shipInfo)
}


 /* 판매자 : 운송장 등록하기 */
function deliveryAPI(data){
    return axios.post (`${url}/ship/deliveryinfo`,data)
}

function* deliveryInfo(action){
    const result = yield call(deliveryAPI, action.data)
}

function* reqDelivery(){
    yield takeLatest('DELIVERYINFO_INSERT_REQUEST',deliveryInfo)
}

 /* 상품 등록 하기 */
function orderAPI(data){
    return axios.post (`${url}/ship/orderdetail`,data)
}

function* OrderdetailSaga(action){
    const result = yield call(orderAPI, action.data)
}

function* reqOrderdetail(){
    yield takeLatest('ORDER_INSERT_REQUEST',OrderdetailSaga)
}

 /* 배송 정보 가져오기 */
 function DeliveryCustomerAPI(data){
    return axios.post (`${url}/ship/deliveryinfo`,data)
}

function* DeliveryCustomerSaga(action){

    const result = yield call(DeliveryCustomerAPI, action.data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'DELIVERY_CUSTOMER_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'DELIVERY_CUSTOMER_ERROR'
        })
    }


}

function* reqDeliveryCustomer(){
    yield takeLatest('DELIVERY_CUSTOMER_REQUEST',DeliveryCustomerSaga)
}

export default function* shipSaga(){
    yield all([
        fork(reqShip),
        fork(reqDelivery),
        fork(reqOrderdetail),
        fork(reqDeliveryCustomer)
    ])
}
