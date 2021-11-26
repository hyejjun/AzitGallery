import axios from 'axios'
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

function reqCategorySelectItemAPI(data){
    return axios.post(`${url}/type/selectitem`,data.data)
}

function* reqCategorySelectItemSaga(data){  
    const result = yield call(reqCategorySelectItemAPI,data)
    if (result.data.result_msg=="OK"){
        yield put({
            type:'CATEGORY_SELECT_ITEM_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'CATEGORY_SELECT_ITEM_ERROR'
        })
    }
}

function* reqCategorySelectItem(){
    yield takeLatest('CATEGORY_SELECT_ITEM_REQUEST',reqCategorySelectItemSaga)
}

function reqMainItemAPI(data){
    return axios.post(`${url}/type/allitem`,data)
}

function* reqMainItemSaga(data){
    const result = yield call(reqMainItemAPI,data)
    if (result.data.result_msg=="OK"){
        yield put({
            type:'MAIN_ALL_DIRECT_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'MAIN_ALL_DIRECT_ERROR'
        })
    }
}
function* reqMainItem(){
    yield takeLatest('MAIN_ALL_DIRECT_REQUEST',reqMainItemSaga)
}
function reqSubAPI(data){
    return axios.post(`${url}/type/sub`,data)
}
function* reqSubSaga(data){
    const result = yield call(reqSubAPI,data)
    if (result.data.result_msg=="OK"){
        yield put({
            type:'SUB_CATEGORY_LIST_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'SUB_CATEGORY_LIST_ERROR'
        })
    }
}
function* reqSub(){
    yield takeLatest('SUB_CATEGORY_LIST_REQUEST',reqSubSaga)
}
function reqMainAPI(){
    return axios.get(`${url}/type/categorys`)
}
function* reqMainSaga(){
    const result = yield call(reqMainAPI)
    if (result.data.result_msg=="OK"){
        yield put({
            type:'ALL_CATEGORY_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'ALL_CATEGORY_ERROR'
        })
    }
}
function* reqMain(){
    yield takeLatest('ALL_CATEGORY_REQUEST',reqMainSaga)
}
export default function* mainSaga(){
    yield all([
        fork(reqMain),
        fork(reqSub),
        fork(reqMainItem),
        fork(reqCategorySelectItem)
    ])
} 