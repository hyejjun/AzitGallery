import {AnyAction} from 'redux'
import {HYDRATE} from 'next-redux-wrapper';



export interface ListState {
    itemList: Array<any>;
    listlength: number;
    auctionList: Array<any>;
    auctionlength: number;
}

export const initialState : ListState = {
    itemList: [],
    listlength: 3,
    auctionList: [],
    auctionlength: 3
};



export const ITEM_LIST_REQUEST = "ITEM_LIST_REQUEST" as const;
export const ITEM_LIST_SUCCESS = "ITEM_LIST_SUCCESS" as const;
export const ITEM_LIST_ERROR = "ITEM_LIST_ERROR" as const;

export const PLUS_ITEM_LIST_REQUEST = "PLUS_ITEM_LIST_REQUEST" as const;
export const PLUS_ITEM_LIST_SUCCESS = "PLUS_ITEM_LIST_SUCCESS" as const;
export const PLUS_ITEM_LIST_ERROR = "PLUS_ITEM_LIST_ERROR" as const;

export const ITEM_AUCTION_REQUEST = "ITEM_AUCTION_REQUEST" as const;
export const ITEM_AUCTION_SUCCESS = "ITEM_AUCTION_SUCCESS" as const;
export const ITEM_AUCTION_ERROR = "ITEM_AUCTION_ERROR" as const;

export const PLUS_AUCTION_LIST_REQUEST = "PLUS_AUCTION_LIST_REQUEST" as const;
export const PLUS_AUCTION_LIST_SUCCESS = "PLUS_AUCTION_LIST_SUCCESS" as const;
export const PLUS_AUCTION_LIST_ERROR = "PLUS_AUCTION_LIST_ERROR" as const;


export const SET_QUERY_REQUEST = "SET_QUERY_REQUEST" as const;
export const SET_QUERY_SUCCESS = "SET_QUERY_SUCCESS" as const;
export const SET_QUERY_ERROR = "SET_QUERY_ERROR" as const;


export const ITEM_GENDER_REQUEST = "ITEM_GENDER_REQUEST" as const;
export const ITEM_GENDER_SUCCESS = "ITEM_GENDER_SUCCESS" as const;
export const ITEM_GENDER_ERROR = "ITEM_GENDER_ERROR" as const;


export const ITEM_RECENT_REQUEST = "ITEM_RECENT_REQUEST" as const;
export const ITEM_RECENT_SUCCESS = "ITEM_RECENT_SUCCESS" as const;
export const ITEM_RECENT_ERROR = "ITEM_RECENT_ERROR" as const;

/* 판매 */
export const Itemlist_REQUEST = () => {
    return {
        type: ITEM_LIST_REQUEST,
  
    }
}

export const Itemlist_SUCCESS = (data) => {
  
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

/* 경매 */

export const ItemAuction_REQUEST = () => {
    return {
        type: ITEM_AUCTION_REQUEST,
  
    }
}

export const ItemAuction_SUCCESS = (data) => {
    console.log(data)
    return {
        type: ITEM_AUCTION_SUCCESS,
        data: data
    }
}

export const ItemAuction_ERROR = () => {
    return {
        type: ITEM_AUCTION_ERROR,
    }
}

export const PlusAuctionlist_REQUEST = (data) => {
    return {
        type: PLUS_AUCTION_LIST_REQUEST,
        data:data
    }
}

export const PlusAuctionlist_SUCCESS = (data,Pluslength) => {
    console.log(data)
    return {
        type: PLUS_AUCTION_LIST_SUCCESS,
        data: data,
        Pluslength: Pluslength
    }
}

export const PlusAuctionlist_ERROR = () => {
    return {
        type: PLUS_AUCTION_LIST_ERROR,
    }
}


/* query에 해당하는 상품만 */

export const SetQuery_REQUEST = (data) => {
    return {
        type: SET_QUERY_REQUEST,
        data: data
    }
}

export const SetQuery_SUCCESS = (data) => {
    console.log(data)
    return {
        type: SET_QUERY_SUCCESS,

    }
}

export const SetQuery_ERROR = () => {
    return {
        type: SET_QUERY_ERROR,
    }
}


/* query에 해당하는 상품만 */

export const ItemGender_REQUEST = () => {
    return {
        type: ITEM_GENDER_REQUEST,
    }
}

export const ItemGender_SUCCESS = (data) => {
    console.log(data)
    return {
        type: ITEM_GENDER_SUCCESS,
        data: data
    }
}

export const ItemGender_ERROR = () => {
    return {
        type: ITEM_GENDER_ERROR,
    }
}

/* query에 해당하는 상품만 */

export const ItemRecent_REQUEST = () => {
    return {
        type: ITEM_RECENT_REQUEST,
    }
}

export const ItemRecent_SUCCESS = (data) => {
    console.log(data)
    return {
        type: ITEM_RECENT_SUCCESS,
        data: data
    }
}

export const ItemRecent_ERROR = () => {
    return {
        type: ITEM_RECENT_ERROR,
    }
}


type ListAction = 
| ReturnType<typeof Itemlist_REQUEST>
| ReturnType<typeof Itemlist_SUCCESS>
| ReturnType<typeof Itemlist_ERROR>

| ReturnType<typeof PlusItemlist_REQUEST>
| ReturnType<typeof PlusItemlist_SUCCESS>
| ReturnType<typeof PlusItemlist_ERROR>

| ReturnType<typeof ItemAuction_REQUEST>
| ReturnType<typeof ItemAuction_SUCCESS>
| ReturnType<typeof ItemAuction_ERROR>

| ReturnType<typeof PlusAuctionlist_REQUEST>
| ReturnType<typeof PlusAuctionlist_SUCCESS>
| ReturnType<typeof PlusAuctionlist_ERROR>

| ReturnType<typeof SetQuery_REQUEST>
| ReturnType<typeof SetQuery_SUCCESS>
| ReturnType<typeof SetQuery_ERROR>

| ReturnType<typeof ItemGender_REQUEST>
| ReturnType<typeof ItemGender_SUCCESS>
| ReturnType<typeof ItemGender_ERROR>

| ReturnType<typeof ItemRecent_REQUEST>
| ReturnType<typeof ItemRecent_SUCCESS>
| ReturnType<typeof ItemRecent_ERROR>

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
            case ITEM_LIST_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_AUCTION_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_AUCTION_SUCCESS:
            return{
                ...state,
                auctionList: action.data
            }
        case ITEM_AUCTION_ERROR:
            return{
                ...state,
            }
        case PLUS_AUCTION_LIST_REQUEST:
            return{
                ...state,
         
            }
        case PLUS_AUCTION_LIST_SUCCESS:
            return{
                ...state,
                auctionitemList: action.data,
                auctionlength: action.Pluslength
            }
        case PLUS_AUCTION_LIST_ERROR:
            return{
                ...state,
            }   
        case SET_QUERY_REQUEST:
            return{
                ...state,
            }
        case SET_QUERY_SUCCESS:
            return{
                ...state,
         
            }
        case SET_QUERY_ERROR:
            return{
                ...state,
            }
        case ITEM_GENDER_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_GENDER_SUCCESS:
            console.log(action.data)
            return{
                ...state,
                itemList: action.data
            }
        case ITEM_GENDER_ERROR:
            return{
                ...state,
            }

        case ITEM_RECENT_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_RECENT_SUCCESS:
            console.log(action.type)
            return{
                ...state,
                itemList: action.data
            }
        case ITEM_RECENT_ERROR:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer