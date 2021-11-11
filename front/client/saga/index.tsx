import {all, fork} from 'redux-saga/effects'
import userSaga from './user'
import mintSaga from './mint'
import shipSaga from './ship'
import typeSaga from './type'
import viewSaga from './view'
import listSaga from './list'
import auctionSaga from './auction'

export default function* rootSaga(){
        yield all([
        fork(userSaga),
        fork(mintSaga),
        fork(shipSaga),
        fork(typeSaga),
        fork(viewSaga),
        fork(listSaga),
        fork(auctionSaga)
        ])        

}