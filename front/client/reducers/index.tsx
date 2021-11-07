import {combineReducers} from 'redux'
import user from './user'
import mint from './mint'
import ship from './ship'
import type from './type'
import list from './list'
import reducer from './user'
import {initialState} from './user'
import {AnyAction} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {UserState} from '../reducers/user'
import {MintState} from '../reducers/mint'
import {ShipState} from './ship'
import { TypeState } from './type'
import { ListState } from '../reducers/list'
import {Reducer} from 'redux'

const persistConfig = {
    key: 'nextjs',
    whitelist: ['fromClient'], // make sure it does not clash with server keys
    storage
};

export interface State {
    user:UserState,
    mint:MintState,
    ship:ShipState,
    type:TypeState,
    list:ListState

}

const combinedReducers = combineReducers({
    user, mint, ship, type, list
})

export const rootReducer:Reducer<State,AnyAction> = (state,action) => {
    let rootReducer = action.type === HYDRATE
    ? {...state,...action.payload}
    : combinedReducers(state,action)
    return rootReducer
}

// const rootReducer = combineReducers({
//     index:(state:State,action:AnyAction)=>{
//         switch (action.type){
//             case HYDRATE:
//                 return {...state, ...action};
//             default :
//                 return {state, action}
//         }
//     },
//     user 
// })

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>