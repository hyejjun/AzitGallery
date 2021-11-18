import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 구매자 :  배송 정보 입력하기 */
function shipAPI(data){
    return axios.post (`${url}/ship/shipinfo`,data)
}

function* shipInfo(action){  
    const result = yield call(shipAPI, action.data)
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

function* orderDetailSaga(action){
    const result = yield call(orderAPI, action.data)
}

function* reqOrderDetail(){
    yield takeLatest('ORDER_INSERT_REQUEST',orderDetailSaga)
}

 /* 배송 정보 가져오기 */
 function deliveryCustomerAPI(data){
    return axios.post (`${url}/ship/deliveryinfo`,data)
}

function* deliveryCustomerSaga(action){
    const result = yield call(deliveryCustomerAPI, action.data)
    yield put({
        type:'DELIVERY_CUSTOMER_SUCCESS',
        data:result.data.ARR
    })
}

function* reqDeliveryCustomer(){
    yield takeLatest('DELIVERY_CUSTOMER_REQUEST',deliveryCustomerSaga)
}

export default function* shipSaga(){
    yield all([
        fork(reqShip),
        fork(reqDelivery),
        fork(reqOrderDetail),
        fork(reqDeliveryCustomer)
    ])
}
