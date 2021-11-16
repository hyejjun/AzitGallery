import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface ViewState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    error: string;
    UserAddress: string;
    verify: number;
    nick_name, title, description, size, color, price, bid_price, currency, left_time, item_img_link: string;
    directView: {};

}

export const initialState: ViewState = {
    loadding: false,
    data: [],
    payload: {},
    error: '',
    UserAddress: 'kaikasAddress',
    verify: 200,
    nick_name: '',
    title: '',
    description: '',
    size: '',
    color: '',
    price: '',
    bid_price: '',
    currency: '',
    left_time: '',
    item_img_link: '',
    directView: {},
};

/* 즉시 판매 view 가져오기 */
export const DIRECTDEAL_VIEW_REQUEST = "DIRECTDEAL_VIEW_REQUEST" as const;
export const DIRECTDEAL_VIEW_SUCCESS = "DIRECTDEAL_VIEW_SUCCESS" as const;
export const DIRECTDEAL_VIEW_ERROR = "DIRECTDEAL_VIEW_ERROR" as const;

/* 경매 view 가져오기 */
export const AUCTION_VIEW_REQUEST = "AUCTION_VIEW_REQUEST" as const;
export const AUCTION_VIEW_SUCCESS = "AUCTION_VIEW_SUCCESS" as const;
export const AUCTION_VIEW_ERROR = "AUCTION_VIEW_ERROR" as const;



/* 즉시 판매 view 가져오기 */
export const directDealView_REQUEST = (idx) => {
    return {
        type: DIRECTDEAL_VIEW_REQUEST,
        idx
    }
}

export const directDealView_SUCCESS = (list) => {
    console.log("리듀서 ==== ",list);
    
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




type ViewAction =
    | ReturnType<typeof directDealView_REQUEST>
    | ReturnType<typeof directDealView_SUCCESS>
    | ReturnType<typeof directDealView_ERROR>
    | ReturnType<typeof auctionView_REQUEST>
    | ReturnType<typeof auctionView_SUCCESS>
    | ReturnType<typeof auctionView_ERROR>

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
                nick_name: action.list.nick_name,
                title: action.list.title,
                description: action.list.description,
                size: action.list.size,
                color: action.list.color,
                price: action.list.price,
                currency: action.list.currency,
                item_img_link: action.list.item_img_link,
            }


        case DIRECTDEAL_VIEW_ERROR:
            return {
                ...state,
            }

        /* 경매 view 가져오기 */
        case AUCTION_VIEW_REQUEST:
            return {
                ...state,
                auctionIdx: action.idx
            }
        case AUCTION_VIEW_SUCCESS:
            return {
                ...state,
                directView: action.list,
                nick_name: action.list.nick_name,
                title: action.list.title,
                description: action.list.description,
                size: action.list.size,
                color: action.list.color,
                bid_price: action.list.bid_price,
                currency: action.list.currency,
                left_time: action.list.left_time,
            }
        case AUCTION_VIEW_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer