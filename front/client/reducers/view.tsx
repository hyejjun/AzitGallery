import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface ShipState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    error: string;
    UserAddress: string;
    verify: number;
}

export const initialState: ShipState = {
    loadding: false,
    data: [],
    payload: {},
    error: '',
    UserAddress: 'kaikasAddress',
    verify: 200,
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
export const directDealView_REQUEST = () => {
    return {
        type: DIRECTDEAL_VIEW_REQUEST,
    }
}

export const directDealView_SUCCESS = () => {
    return {
        type: DIRECTDEAL_VIEW_SUCCESS,
    }
}

export const directDealView_ERROR = () => {
    return {
        type: DIRECTDEAL_VIEW_ERROR,
    }
}



/* 경매 view 가져오기 */
export const auctionView_REQUEST = () => {
    return {
        type: AUCTION_VIEW_REQUEST,
    }
}

export const auctionView_SUCCESS = () => {
    return {
        type: AUCTION_VIEW_SUCCESS,
    }
}

export const auctionView_ERROR = () => {
    return {
        type: AUCTION_VIEW_ERROR,
    }
}




type ShipAction =
    | ReturnType<typeof directDealView_REQUEST>
    | ReturnType<typeof directDealView_SUCCESS>
    | ReturnType<typeof directDealView_ERROR>
    | ReturnType<typeof auctionView_REQUEST>
    | ReturnType<typeof auctionView_SUCCESS>
    | ReturnType<typeof auctionView_ERROR>

const reducer = (state: ShipState = initialState, action: ShipAction) => {
    switch (action.type) {
        /* 즉시 판매 view 가져오기 */
        case DIRECTDEAL_VIEW_REQUEST:
            return {
                ...state,
            }
        case DIRECTDEAL_VIEW_SUCCESS:
            return {
                ...state,
            }
        case DIRECTDEAL_VIEW_ERROR:
            return {
                ...state,
            }

        /* 경매 view 가져오기 */
        case AUCTION_VIEW_REQUEST:
            return {
                ...state,
            }
        case AUCTION_VIEW_SUCCESS:
            return {
                ...state,
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