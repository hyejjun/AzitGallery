import {AnyAction} from 'redux'
import {HYDRATE} from 'next-redux-wrapper';



export interface ListState {
    itemList: Array<any>;
    listlength: number;
}

export const initialState : ListState = {
    itemList: [],
    listlength: 3,
};



export const ITEM_LIST_REQUEST = "ITEM_LIST_REQUEST" as const;
export const ITEM_LIST_SUCCESS = "ITEM_LIST_SUCCESS" as const;
export const ITEM_LIST_ERROR = "ITEM_LIST_ERROR" as const;

export const PLUS_ITEM_LIST_REQUEST = "PLUS_ITEM_LIST_REQUEST" as const;
export const PLUS_ITEM_LIST_SUCCESS = "PLUS_ITEM_LIST_SUCCESS" as const;
export const PLUS_ITEM_LIST_ERROR = "PLUS_ITEM_LIST_ERROR" as const;

export const Itemlist_REQUEST = () => {
    return {
        type: ITEM_LIST_REQUEST,
  
    }
}

export const Itemlist_SUCCESS = (data) => {
    console.log(data)
    return {
        type: ITEM_LIST_SUCCESS,
        data: data
    }
}

export const Itemlist_ERROR = () => {
    return {
        type: ITEM_LIST_ERROR,
    }
}

export const PlusItemlist_REQUEST = (data) => {
    return {
        type: PLUS_ITEM_LIST_REQUEST,
        data:data
    }
}

export const PlusItemlist_SUCCESS = (data,Pluslength) => {
    console.log(data)
    return {
        type: PLUS_ITEM_LIST_SUCCESS,
        data: data,
        Pluslength: Pluslength
    }
}

export const PlusItemlist_ERROR = () => {
    return {
        type: PLUS_ITEM_LIST_ERROR,
    }
}

type ListAction = 
| ReturnType<typeof Itemlist_REQUEST>
| ReturnType<typeof Itemlist_SUCCESS>
| ReturnType<typeof Itemlist_ERROR>

| ReturnType<typeof PlusItemlist_REQUEST>
| ReturnType<typeof PlusItemlist_SUCCESS>
| ReturnType<typeof PlusItemlist_ERROR>

const reducer = (state:ListState=initialState, action:ListAction) => {
    switch (action.type){
        case ITEM_LIST_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_LIST_SUCCESS:
            return{
                ...state,
                itemList: action.data
            }
        case ITEM_LIST_ERROR:
            return{
                ...state,
            }
        case PLUS_ITEM_LIST_REQUEST:
            return{
                ...state,
         
            }
        case PLUS_ITEM_LIST_SUCCESS:
            console.log(action.Pluslength)
            return{
                ...state,
                itemList: action.data,
                listlength: action.Pluslength
            }
          
        case PLUS_ITEM_LIST_ERROR:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer