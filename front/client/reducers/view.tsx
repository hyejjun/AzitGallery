import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface ViewState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    qtydata:Array<number>;
    sizedata:Array<string>
    error: string;
    UserAddress: string;
    verify: number;
    nick_name, title, description,size,color,bid_price, currency, left_time, kr_end_date: string;
    price:number,
    item_img_link : Array<string>,
    directView: {};
    directIdx:number
    qty:Array<number>;
    selected:{
        qty:number,
        color:string,
        size:string
    };
    sellerKaikasAddress : string;

}

export const initialState: ViewState = {
    loadding: false,
    data: [],
    payload: {},
    qtydata:[],
    sizedata:[],
    error: '',
    UserAddress: 'kaikasAddress',
    verify: 200,
    nick_name : '',
    title : '',
    description : '',
    size : '',
    color : '',
    price : 0,
    bid_price : '',
    currency : '',
    left_time : '',
    kr_end_date : '',
    qty: [],
    item_img_link: [],
    directView: {},
    selected:{
        qty:0,
        color:'',
        size:''
    },
    directIdx:0,
    sellerKaikasAddress : ''
    
};

/* 즉시 판매 view 가져오기 */
export const DIRECTDEAL_VIEW_REQUEST = "DIRECTDEAL_VIEW_REQUEST" as const;
export const DIRECTDEAL_VIEW_SUCCESS = "DIRECTDEAL_VIEW_SUCCESS" as const;
export const DIRECTDEAL_VIEW_ERROR = "DIRECTDEAL_VIEW_ERROR" as const;

/* 경매 view 가져오기 */
export const AUCTION_VIEW_REQUEST = "AUCTION_VIEW_REQUEST" as const;
export const AUCTION_VIEW_SUCCESS = "AUCTION_VIEW_SUCCESS" as const;
export const AUCTION_VIEW_ERROR = "AUCTION_VIEW_ERROR" as const;

export const GET_MATCH_SIZE_REQUEST = "GET_MATCH_SIZE_REQUEST" as const;
export const GET_MATCH_SIZE_SUCCESS = "GET_MATCH_SIZE_SUCCESS" as const;
export const GET_MATCH_SIZE_ERROR = "GET_MATCH_SIZE_ERROR" as const;

export const GET_MATCH_QTY_REQUEST = "GET_MATCH_QTY_REQUEST" as const;
export const GET_MATCH_QTY_SUCCESS = "GET_MATCH_QTY_SUCCESS" as const;
export const GET_MATCH_QTY_ERROR = "GET_MATCH_QTY_ERROR" as const;



/* 즉시 판매 view 가져오기 */
export const directDealView_REQUEST = (idx) => {
    return {
        type: DIRECTDEAL_VIEW_REQUEST,
        idx
    }
}

export const directDealView_SUCCESS = (list) => {
    return {
        type: DIRECTDEAL_VIEW_SUCCESS,
        list
    }
}

export const directDealView_ERROR = () => {
    return {
        type: DIRECTDEAL_VIEW_ERROR,
    }
}



/* 경매 view 가져오기 */
export const auctionView_REQUEST = (idx) => {
    return {
        type: AUCTION_VIEW_REQUEST,
        idx
    }
}

export const auctionView_SUCCESS = (list) => {
    return {
        type: AUCTION_VIEW_SUCCESS,
        list
    }
}

export const auctionView_ERROR = () => {
    return {
        type: AUCTION_VIEW_ERROR,
    }
}

export const getMatchQty_REQUEST = (data) => {
    return {
        type:GET_MATCH_QTY_REQUEST,
        data:data
    }
}
export const getMatchQty_SUCCESS = (data) => {
    return {
        type:GET_MATCH_QTY_SUCCESS,
        data:data

    }
}
export const getMatchQty_ERROR = () => {
    return {
        type:GET_MATCH_QTY_ERROR
    }
} 

export const getMatchSize_REQUEST = (data) => {
    return {
        type:GET_MATCH_SIZE_REQUEST,
        data:data
    }
}
export const getMatchSize_SUCCESS = (data) => {
    return {
        type:GET_MATCH_SIZE_SUCCESS,
        data:data

    }
}
export const getMatchSize_ERROR = () => {
    return {
        type:GET_MATCH_SIZE_ERROR
    }
}

type ViewAction =
    | ReturnType<typeof directDealView_REQUEST>
    | ReturnType<typeof directDealView_SUCCESS>
    | ReturnType<typeof directDealView_ERROR>

    | ReturnType<typeof auctionView_REQUEST>
    | ReturnType<typeof auctionView_SUCCESS>
    | ReturnType<typeof auctionView_ERROR>

    | ReturnType<typeof getMatchQty_REQUEST>
    | ReturnType<typeof getMatchQty_SUCCESS>
    | ReturnType<typeof getMatchQty_ERROR>

    | ReturnType<typeof getMatchSize_REQUEST>
    | ReturnType<typeof getMatchSize_SUCCESS>
    | ReturnType<typeof getMatchSize_ERROR>


const reducer = (state: ViewState = initialState, action: ViewAction) => {
    switch (action.type) {
        /* 즉시 판매 view 가져오기 */
        case DIRECTDEAL_VIEW_REQUEST:
            return {
                ...state,
                directIdx: action.idx
            }
        case DIRECTDEAL_VIEW_SUCCESS:
            
            return {
                ...state,
                directView: action.list,
                nick_name : action.list.nick_name,
                title : action.list.title,
                description : action.list.description,
                size : action.list.size,
                color : action.list.color,
                price : action.list.price,
                currency : action.list.currency,
                item_img_link: action.list.item_img_link,
                qty:action.list.qty,
                sellerKaikasAddress:action.list.seller_kaikas_address
            }


        case DIRECTDEAL_VIEW_ERROR:
            return {
                ...state,
            }

        /* 경매 view 가져오기 */
        case AUCTION_VIEW_REQUEST:
            return {
                ...state,
                auctionIdx:action.idx
            }
        case AUCTION_VIEW_SUCCESS:
            return {
                ...state,
                directView: action.list,
                nick_name : action.list.nick_name,
                title : action.list.title,
                description : action.list.description,
                size : action.list.size,
                color : action.list.color,
                bid_price : action.list.bid_price,
                currency : action.list.currency,
                kr_end_date : action.list.kr_end_date,
                item_img_link: action.list.item_img_link,
                sellerKaikasAddress:action.list.seller_kaikas_address
            }
        case AUCTION_VIEW_ERROR:
            return {
                ...state,
            }
        case GET_MATCH_QTY_REQUEST:
            return {
                ...state,
                payload:action.data
            }
        case GET_MATCH_QTY_SUCCESS:
            return {
                ...state,
                qtydata:action.data
            }
        case GET_MATCH_QTY_ERROR:
            return {
                ...state
            }
        case GET_MATCH_SIZE_REQUEST:
            return {
                ...state,
                payload:action.data
            }
        case GET_MATCH_SIZE_SUCCESS:
            return {
                ...state,
                sizedata:action.data
            }
        case GET_MATCH_SIZE_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer