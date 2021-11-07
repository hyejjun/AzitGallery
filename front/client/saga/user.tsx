

import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";


/* 로그인 중복 확인 */
function loginAPI(action){
    return axios.post(`http://localhost:4000/user/addressdbcheck`,JSON.stringify(action.data))
    
}

function* login(action){

    let result = yield call(loginAPI,action)
    console.log(result)
    if(result.data.signupBoolean == true){
        yield put({
            type:'SIGNUP_POST_SUCCESS',
      
        })
    }else{
        yield put({
            type:'SIGNUP_POST_ERROR',
        
        })
    }
}

function* reqLogin(){
    yield takeLatest('USER_LOGIN_REQUEST',login)
}

/* 이메일 인증 */

function sellerAdminAPI(action) {
    return axios.post(`http://localhost:4000/user/selleradmin`)
}

function* sellerAdminSaga(action){
    const result = yield call(sellerAdminAPI,action)     

    
}

function* reqAdminEmail(){
    yield takeLatest('SELLER_ADMIN_REQUEST',sellerAdminSaga)
}



/* 이메일 대기 */

function sellerWaitAPI(action):any {
    return axios.post(`http://localhost:4000/user/selleradminwait`,JSON.stringify(action.data))
}

function* sellerWaitSaga(action){
    const result = yield call(sellerWaitAPI,action)     

    
}

function* reqWaitEmail(){
    yield takeLatest('SELLER_ADMIN_WAIT_REQUEST',sellerWaitSaga)
}


/* 회원 가입 post */
function signupAPI(action) {
    return axios.post(`http://localhost:4000/user/signup`,JSON.stringify(action.data))
}

function* signupSaga(action){
    const result = yield call(signupAPI,action)

}

function* reqSignup(){
    yield takeLatest('SIGNUP_POST_REQUEST',signupSaga)
}

/* 회원가입 nickname 중복체크 */

function nicknameAPI(action):any {
    return axios.post(`http://localhost:4000/user/nicknamechk`,JSON.stringify(action.data))
}

function* nicknameSaga(action){
    const result = yield call(nicknameAPI(action))

}

function* reqNickname(){
    yield takeLatest('SIGNUP_POST_REQUEST',nicknameSaga)
}



/* 관리자 페이지 user list req */

function userListAPI() {
    return axios.get(`http://localhost:4000/user/userlist`)
}

function* userListSaga(){
    const result = yield call(userListAPI)
    // console.log(result.data)
    console.log("result ===== ",result);
    
    console.log(result.data.ARR)
    yield put({
        type:'USER_LIST_SUCCESS',
        data:result.data.ARR
    })    

}

function* reqUserList(){
    yield takeLatest('USER_LIST_REQUEST',userListSaga)
}

/* 관리자 페이지 user list req */

function adminAccessAPI(action):any {
    return axios.post(`http://localhost:4000/user/selleradminaccess`,JSON.stringify(action.data))
}

function* sellerAdminAccessSaga(action){
    const result = yield call(adminAccessAPI,action)
    

}

function* reqSellerAdminAccess(){
    yield takeLatest('SELLER_ADMIN_ACCESS_REQUEST',sellerAdminAccessSaga)
}

/* 관리자 페이지 user list req */

function adminDenyAPI(action) {
    return axios.post(`http://localhost:4000/user/selleradmindeny`,JSON.stringify(action.data))
}

function* sellerAdminDenySaga(action){
    const result = yield call(adminDenyAPI,action)
   

}

function* reqSellerAdminDeny(){
    yield takeLatest('SELLER_ADMIN_DENY_REQUEST',sellerAdminDenySaga)
}

export default function* userSaga(){
    yield all([
        fork(reqLogin),
        fork(reqSignup),
        fork(reqAdminEmail),
        fork(reqUserList),
        fork(reqSellerAdminAccess),
        fork(reqSellerAdminDeny),
        fork(reqWaitEmail),
        
    ])
}
