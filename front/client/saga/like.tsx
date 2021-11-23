import axios from 'axios';
import {all,put,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'

/* like 부분 업데이트 */
function likeInsertAPI(data){
    return axios.post (`${url}/like/insert`,data)
}

function* likeInsertSaga(action){
    const result = yield call(likeInsertAPI, action.data)
    let itemIdx = JSON.parse(result.data.item_id) 
  
    yield put({
        type:'LIKE_INSERT_SUCCESS',
        likeStatus : result.data.like_status,
        likeBool : result.data.like_bool,
        itemIdx
    })
}

function* reqLikeInsert(){
    yield takeLatest('LIKE_INSERT_REQUEST',likeInsertSaga)
}

/* 사용자 별 전체 like list 가져오기 */

function likeListAPI(data){
    return axios.post (`${url}/like/list`,JSON.stringify(data))
}

function* likeListSaga(action){
    // console.log(action);
    
    const result = yield call(likeListAPI, action.data)
    // console.log(result);
    

  
    yield put({
        type:'LIKE_LIST_SUCCESS',
        likeList : result.data.result_arr
    })
}

function* reqLikeList(){
    yield takeLatest('LIKE_LIST_REQUEST',likeListSaga)
}


export default function* shipSaga(){
    yield all([
        fork(reqLikeInsert),
        fork(reqLikeList),
    ])
}
