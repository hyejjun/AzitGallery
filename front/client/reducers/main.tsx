import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';
export interface MainState {
    categoryList:Array<any>;
    subList:Array<any>;
    mainitemList:Array<any>;
    data:any,
    listId:number
    list:Array<any>;
}
export const initialState: MainState = {
    categoryList:[],
    subList:[],
    mainitemList:[],
    data:'',
    list:[],
    listId:0
    
}
export const ALL_CATEGORY_REQUEST = "ALL_CATEGORY_REQUEST" as const
export const ALL_CATEGORY_SUCCESS = "ALL_CATEGORY_SUCCESS" as const
export const ALL_CATEGORY_ERROR = "ALL_CATEGORY_ERROR" as const
export const SUB_CATEGORY_LIST_REQUEST = "SUB_CATEGORY_LIST_REQUEST" as const
export const SUB_CATEGORY_LIST_SUCCESS = "SUB_CATEGORY_LIST_SUCCESS" as const
export const SUB_CATEGORY_LIST_ERROR = "SUB_CATEGORY_LIST_ERROR" as const
export const MAIN_ALL_DIRECT_REQUEST = "MAIN_ALL_DIRECT_REQUEST" as const
export const MAIN_ALL_DIRECT_SUCCESS = "MAIN_ALL_DIRECT_SUCCESS" as const
export const MAIN_ALL_DIRECT_ERROR = "MAIN_ALL_DIRECT_ERROR" as const

export const CATEGORY_SELECT_ITEM_REQUEST = "CATEGORY_SELECT_ITEM_REQUEST"  as const
export const CATEGORY_SELECT_ITEM_SUCCESS = "CATEGORY_SELECT_ITEM_SUCCESS" as const
export const CATEGORY_SELECT_ITEM_ERROR = "CATEGORY_SELECT_ITEM_ERROR" as const

export const all_category_REQUEST = () => {
    return{
        type: ALL_CATEGORY_REQUEST,
        
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
export const sub_category_list_REQUEST = (data) => {
    return{
        type: SUB_CATEGORY_LIST_REQUEST,
        data:data,
    }
}
export const sub_category_list_SUCCESS = (data) => {
    return{
        type: SUB_CATEGORY_LIST_SUCCESS,
        data:data
    }
}
export const sub_category_list_ERROR = () => {
    return{
        type: SUB_CATEGORY_LIST_ERROR,
    }
}
export const main_all_direct_REQUEST = (data) => {
    return{
        type:MAIN_ALL_DIRECT_REQUEST,
        data:data
    }
}
export const main_all_direct_SUCCESS = (data) => {
    return{
        type:MAIN_ALL_DIRECT_SUCCESS,
        data:data
    }
}
export const main_all_direct_ERROR = () => {
    return{
        type:MAIN_ALL_DIRECT_ERROR
    }
}

export const category_select_item_REQUEST = (data) => {
    return{
        type:CATEGORY_SELECT_ITEM_REQUEST,
        data:data
    }
}
export const category_select_item_SUCCESS = (data) => {
    return{
        type:CATEGORY_SELECT_ITEM_SUCCESS,
        data:data
    }
}
export const category_select_item_ERROR = () => {
    return{
        type:CATEGORY_SELECT_ITEM_ERROR
    }
}
type MainAction = 
    | ReturnType<typeof all_category_REQUEST>
    | ReturnType<typeof all_category_SUCCESS>
    | ReturnType<typeof all_category_ERROR>
    | ReturnType<typeof sub_category_list_REQUEST>
    | ReturnType<typeof sub_category_list_SUCCESS>
    | ReturnType<typeof sub_category_list_ERROR>
    | ReturnType<typeof main_all_direct_REQUEST>
    | ReturnType<typeof main_all_direct_SUCCESS>
    | ReturnType<typeof main_all_direct_ERROR>
    | ReturnType<typeof category_select_item_REQUEST>
    | ReturnType<typeof category_select_item_SUCCESS>
    | ReturnType<typeof category_select_item_ERROR>

const reducer = (state:MainState = initialState, action:MainAction) => {
    switch(action.type){
        case ALL_CATEGORY_REQUEST:
            return{
                ...state
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList:action.data,   
            }
        case ALL_CATEGORY_ERROR:
            return{
                ...state
            }
        case SUB_CATEGORY_LIST_REQUEST:
            return{
                ...state,
                listId:action.data,
                
            }
        case SUB_CATEGORY_LIST_SUCCESS:
            return{
                ...state,
                subList:action.data,
            }
        case SUB_CATEGORY_LIST_ERROR:
            return{
                ...state
            }
        case MAIN_ALL_DIRECT_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case MAIN_ALL_DIRECT_SUCCESS:
            return{
                ...state,
                mainitemList:action.data
            }
        case MAIN_ALL_DIRECT_ERROR :
            return{
                ...state
            }
        case CATEGORY_SELECT_ITEM_REQUEST :
            return{
                ...state,
                data:action.data
            }
        case CATEGORY_SELECT_ITEM_SUCCESS :
            return{
                ...state,
                mainitemList:action.data
            }
        case CATEGORY_SELECT_ITEM_ERROR :
            return{
                ...state
            }
        default:
            return state;
    }
}
export default reducer
