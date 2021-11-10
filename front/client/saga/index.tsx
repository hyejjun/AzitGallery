import {all, fork} from 'redux-saga/effects'
import userSaga from './user'
import mintSaga from './mint'
import shipSaga from './ship'
import typeSaga from './type'
import listSaga from './list'

export default function* rootSaga(){
        yield all([
        fork(userSaga),
        fork(mintSaga),
        fork(shipSaga),
        fork(typeSaga),
        fork(listSaga),
        ])        

}