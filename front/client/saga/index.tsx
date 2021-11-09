import {all, fork} from 'redux-saga/effects'
import userSaga from './user'
import mintSaga from './mint'
import shipSaga from './ship'
import typeSaga from './type'
import viewSaga from './veiw'
import listSaga from './list'

export default function* rootSaga(){
        yield all([
        fork(userSaga),
        fork(mintSaga),
        fork(shipSaga),
        fork(typeSaga),
        fork(viewSaga),
        fork(listSaga),
        ])        

}