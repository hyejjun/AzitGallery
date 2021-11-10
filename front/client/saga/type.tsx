import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* 판매 경매 선택 */
function sellTypeAPI(data){
    return axios.post (`${url}/type/selltype`,data)
}

function* sellType(action){  
    const result = yield call(sellTypeAPI, action.data)
}

function* reqSellType(){
    yield takeLatest('SELECT_SELLTYPE_REQUEST',sellType)
}


/* 카테고리 선택 */
function selectCategoryAPI(data){
    return axios.post (`${url}/type/category`,data)
}

function* selectCategory(action){
    
    
    const result = yield call(selectCategoryAPI, action.data)
    console.log('saga')
    yield put({
        type:'ITEM_GENDER_SUCCESS',
        data:result.data.ARR
        
    })
}

function* reqSelectCategory(){
    yield takeLatest('SELECT_CATEGORY_REQUEST',selectCategory)
}


/* 상품 검색 */
function itemSearchAPI(data){
    return axios.post (`${url}/type/search`,data)
}

function* itemSearch(action){
    console.log(action.data);
    
    const result = yield call(itemSearchAPI, action.data)
}

function* reqItemSearch(){
    yield takeLatest('ITEM_SEARCH_REQUEST',itemSearch)
}


/* 상품 정렬 - 최근발행 | 인기 많은 순 */
function sortTypeAPI(data){
    return axios.post (`${url}/type/sort`,data)
}

function* sortType(action){
    console.log('되는 건가?')
    const result = yield call(sortTypeAPI, action.data)
        yield put({
        type:'ITEM_RECENT_SUCCESS',
        data:result.data.ARR
        
    })
}

function* reqSortType(){
    yield takeLatest('ITEM_SORT_REQUEST',sortType)
}

/* 카테고리 */
function categoryAPI(){
    return axios.post(`${url}/type/categorylist`)
}

function* categorySaga(){
    const result = yield call(categoryAPI)
        yield put({
        type:'CATEGORY_SUCCESS',
        main:result.data.main,
        sub:result.data.sub
        
    })
}

function* reqCategory(){
    yield takeLatest('CATEGORY_REQUEST',categorySaga)
}
export default function* typeSaga(){
    yield all([
        fork(reqSellType),
        fork(reqSelectCategory),
        fork(reqItemSearch),
        fork(reqSortType),
        fork(reqCategory),
    ])
}
