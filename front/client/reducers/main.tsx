import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface mainState {
    categoryList:Array<any>;
    subList:Array<any>;
    mainitemList:Array<any>;
}

export const initialState: mainState = {
    categoryList:[],
    subList:[],
    mainitemList:[]
    
}

export const ALL_CATEGORY_REQUEST = "ALL_CATEGORY_REQUEST" as const
export const ALL_CATEGORY_SUCCESS = "ALL_CATEGORY_SUCCESS" as const
export const ALL_CATEGORY_ERROR = "ALL_CATEGORY_ERROR" as const

export const SUB_CATEGORY_REQUEST = "SUB_CATEGORY_REQUEST" as const
export const SUB_CATEGORY_SUCCESS = "SUB_CATEGORY_SUCCESS" as const
export const SUB_CATEGORY_ERROR = "SUB_CATEGORY_ERROR" as const

export const MAIN_ALL_REQUEST = "MAIN_ALL_REQUEST" as const
export const MAIN_ALL_SUCCESS = "MAIN_ALL_SUCCESS" as const
export const MAIN_ALL_ERROR = "MAIN_ALL_ERROR" as const

export const all_category_REQUEST = () => {
    return{
        type: ALL_CATEGORY_REQUEST 
    }
}
export const all_category_SUCCESS = (data) => {
    return{
        type: ALL_CATEGORY_SUCCESS,
        data:data
    }
}

export const all_category_ERROR = () => {
    return{
        type:ALL_CATEGORY_ERROR
    }
}

export const sub_category_REQUEST = (data) => {
    return{
        type: SUB_CATEGORY_REQUEST,
        data:data
    }
}
export const sub_category_SUCCESS = (data) => {
    console.log('reducer sub')
    return{
        type: SUB_CATEGORY_SUCCESS,
        data:data
    }
}
export const sub_category_ERROR = () => {
    return{
        type: SUB_CATEGORY_ERROR,
    }
}

export const main_all_REQUEST = (data) => {
    return{
        type:MAIN_ALL_REQUEST,
        data:data
    }
}
export const main_all_SUCCESS = (data) => {
    return{
        type:MAIN_ALL_SUCCESS,
        data:data
    }
}
export const main_all_ERROR = () => {
    return{
        type:MAIN_ALL_ERROR
    }
}
type MainAction = 
    | ReturnType<typeof all_category_REQUEST>
    | ReturnType<typeof all_category_SUCCESS>
    | ReturnType<typeof all_category_ERROR>
    | ReturnType<typeof sub_category_REQUEST>
    | ReturnType<typeof sub_category_SUCCESS>
    | ReturnType<typeof sub_category_ERROR>
    | ReturnType<typeof main_all_REQUEST>
    | ReturnType<typeof main_all_SUCCESS>
    | ReturnType<typeof main_all_ERROR>

const reducer = (state:mainState = initialState, action:MainAction) => {
    switch(action.type){
        case ALL_CATEGORY_REQUEST:
            return{
                ...state
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList:action.data
            }
        case ALL_CATEGORY_ERROR:
            return{
                ...state
            }
        case SUB_CATEGORY_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case SUB_CATEGORY_SUCCESS:
            return{
                ...state,
                subList:action.data
            }
        case SUB_CATEGORY_ERROR:
            return{
                ...state
            }
        case MAIN_ALL_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case MAIN_ALL_SUCCESS:
            return{
                ...state,
                mainitemList:action.data
            }
        case MAIN_ALL_ERROR :
            return{
                ...state
            }
        default:
            return state;
    }
}

export default reducer
