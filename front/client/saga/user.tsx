

import { ContactlessOutlined } from '@mui/icons-material';
import axios from 'axios';
import {all,put,takeEvery,takeLatest,fork,call} from "redux-saga/effects";
import {url} from './url'


/* 로그인 중복 확인 */
function loginAPI(action){
    return axios.post(`${url}/user/addressdbcheck`,JSON.stringify(action.data))
}

function* login(action){

    let result = yield call(loginAPI,action)

    if(result.data.signupBool == true){
        yield put({
            type: 'USER_LOGIN_SUCCESS',
            signupBool : result.data.signupBool,
            UserAddress : result.data.kaikas_address,
            userIdx : result.data.user_idx,   
            adminApproval : result.data.admin_approval,   
            sellerBool : result.data.sellerBool,   
        })
    }else{
        yield put({
            type: 'USER_LOGIN_ERROR',
            signupBool : result.data.signupBool
        
        })
    }
}

function* reqLogin(){
    yield takeLatest('USER_LOGIN_REQUEST',login)
}

/* 로그아웃 */
function* logout() {

    yield put({
        type: 'USER_LOGOUT_SUCCESS',
        loginBool: false,
        UserAddress: 'kaikasAddress'
    })
}

function* reqLogout() {
    yield takeLatest('USER_LOGOUT_REQUEST', logout)
}


/* 이메일 인증 */

function sellerAdminAPI(action) {
    return axios.post(`${url}/user/selleradmin`, action.data)
}

function* sellerAdminSaga(action){
    const result = yield call(sellerAdminAPI,action)         
}

function* reqAdminEmail(){
    yield takeLatest('SELLER_ADMIN_REQUEST',sellerAdminSaga)
}



/* 이메일 대기 */

function sellerWaitAPI(action) {
    return axios.post(`${url}/user/selleradminwait`,JSON.stringify(action))
}

function* sellerWaitSaga(action){    
    const result = yield call(sellerWaitAPI,action.data)    
}

function* reqWaitEmail(){
    yield takeLatest('SELLER_ADMIN_WAIT_REQUEST',sellerWaitSaga)
}


/* 회원 가입 post */
function signupAPI(action) {
    return axios.post(`${url}/user/signup`,JSON.stringify(action.data))
}

function* signupSaga(action){
    const result = yield call(signupAPI,action)

}

function* reqSignup(){
    yield takeLatest('SIGNUP_POST_REQUEST',signupSaga)
}

/* 회원가입 nickname 중복체크 */

function nicknameAPI(action):any {
    return axios.post(`${url}/user/nicknamechk`,JSON.stringify(action.data))
}

function* nicknameSaga(action){
    const result = yield call(nicknameAPI,action)
    if(result.data.nicknameChkBool == true){
        yield put({
            type:'NICKNAME_POST_SUCCESS',
        })
    }else{
        yield put({
            type:'NICKNAME_POST_ERROR',
        })
    }

}

function* reqNickname(){
    yield takeLatest('NICKNAME_POST_REQUEST',nicknameSaga)
}


/* 이메일 인증 */
function emailAPI(action) {
    return axios.post(`${url}/user/emailchk`, JSON.stringify(action.data))
}

function* emailSaga(action){
    const result = yield call(emailAPI, action)
    yield put({
        type:'EMAIL_POST_SUCCESS',
        data:result.data
    })
    
}

function* reqEmail(){
    yield takeLatest('EMAIL_POST_REQUEST',emailSaga)
}


/* 관리자 페이지 user list req */

function userListAPI() {
    return axios.get(`${url}/user/userlist`)
}

function* userListSaga(){
    const result = yield call(userListAPI)
    yield put({
        type:'USER_LIST_SUCCESS',
        data:result.data
    })    

}

function* reqUserList(){
    yield takeLatest('USER_LIST_REQUEST',userListSaga)
}

/* 관리자 페이지 user list req */

function adminAccessAPI(action){
    return axios.post(`${url}/user/selleradminaccess`,JSON.stringify(action))
}

function* sellerAdminAccessSaga(action){
    const result = yield call(adminAccessAPI,action.data)
    
}

function* reqSellerAdminAccess(){
    yield takeLatest('SELLER_ADMIN_ACCESS_REQUEST',sellerAdminAccessSaga)
}

/* 관리자 페이지 user list req */

function adminDenyAPI(action) {
    return axios.post(`${url}/user/selleradmindeny`,JSON.stringify(action.data))
}

function* sellerAdminDenySaga(action){
    const result = yield call(adminDenyAPI,action)
}

function* reqSellerAdminDeny(){
    yield takeLatest('SELLER_ADMIN_DENY_REQUEST',sellerAdminDenySaga)
}

/* user/uesr페이지 user info req */
function userInfoAPI(action){
    return axios.post(`${url}/user/userinfo`,JSON.stringify(action.data))
}

function* userInfoSaga(action){
    const userinfo = yield call(userInfoAPI,action)
    const {admin_approval,email_validation,result } =userinfo.data

    let userdata = {
        result,
        admin_approval,
        email_validation
    }
    yield put({
        type:'USER_INFO_SUCCESS',
        data:userdata,
    })
}
function* reqUesrInfo(){
    yield takeLatest('USER_INFO_REQUEST',userInfoSaga)
}





function reqUpdateShipAPI(data){
    return axios.post(`${url}/user/shipch`, data) 
}
function* reqUpdateShipSaga(data){
    
    const result = yield call(reqUpdateShipAPI,data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'UPDATE_SHIP_STATE_SUCCESS',
            data:result.data.result
        })
    }else{
        yield put({
            type:'UPDATE_SHIP_STATE_ERROR'
        })
    }


}

function* reqUpdateShip(){
    yield takeLatest('UPDATE_SHIP_STATE_REQUEST',reqUpdateShipSaga)
}

// 판매자 체크
function reqAdminApprovalAPI(data){
    return axios.post(`${url}/user/selleradmincheck`, JSON.stringify(data)) 
}
function* reqAdminApprovalSaga(action){
    
    const result = yield call(reqAdminApprovalAPI, action.data)
    if(result.data.result_msg=='OK'){
        yield put({
            type:'ADMIN_APPROVAL_CHECK_SUCCESS',
            adminApproval : result.data.admin_approval
        })
    }else{
        yield put({
            type:'ADMIN_APPROVAL_CHECK_ERROR'
        })
    }
}

function* reqAdminApproval(){
    yield takeLatest('ADMIN_APPROVAL_CHECK_REQUEST',reqAdminApprovalSaga)
}


export default function* userSaga(){
    yield all([
        fork(reqLogin),
        fork(reqLogout),
        fork(reqSignup),
        fork(reqAdminEmail),
        fork(reqUserList),
        fork(reqSellerAdminAccess),
        fork(reqSellerAdminDeny),
        fork(reqWaitEmail),
        fork(reqUesrInfo),
        fork(reqNickname),
        fork(reqEmail),
        fork(reqUpdateShip), 
        fork(reqAdminApproval), 
    ])
}
