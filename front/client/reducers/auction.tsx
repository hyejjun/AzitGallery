import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface AuctionState {
    current: number
    endDate: Boolean
    now: Date
    buyer: string,
    prevWallet : string,
    prevAmount : string
}

export const initialState: AuctionState = {
    current: 0,
    endDate: false,
    now: new Date(),
    buyer: 'kai',
    prevWallet : '',
    prevAmount : ''
};

/* 경매 가격 */
export const AUCTION_PRICE_REQUEST = "AUCTION_PRICE_REQUEST" as const;
export const AUCTION_PRICE_SUCCESS = "AUCTION_PRICE_SUCCESS" as const;
export const AUCTION_PRICE_ERROR = "AUCTION_PRICE_ERROR" as const;


/* 경매 참여 */
export const AUCTION_CURRENT_REQUEST = "AUCTION_CURRENT_REQUEST" as const;
export const AUCTION_CURRENT_SUCCESS = "AUCTION_CURRENT_SUCCESS" as const;
export const AUCTION_CURRENT_ERROR = "AUCTION_CURRENT_ERROR" as const;

/* 경매 마감 */
export const AUCTION_CLOSE_REQUEST = "AUCTION_CLOSE_REQUEST" as const;
export const AUCTION_CLOSE_SUCCESS = "AUCTION_CLOSE_SUCCESS" as const;
export const AUCTION_CLOSE_ERROR = "AUCTION_CLOSE_ERROR" as const;


/* 경매 가격 */
export const Auction_Current_REQUEST = (data) => {
    return {
        type: AUCTION_CURRENT_REQUEST,
        data: data
    }
}

export const Auction_Current_SUCCESS = (current, endDate, buyer, prevWallet,prevAmount) => {
    return {
        type: AUCTION_CURRENT_SUCCESS,
        current: current,
        endDate: endDate,
        buyer: buyer,
        prevWallet,
        prevAmount
    }
}

export const Auction_Current_ERROR = () => {
    return {
        type: AUCTION_CURRENT_ERROR,
    }
}

/* 경매 참여 */
export const Auction_Price_REQUEST = (data) => {
    return {
        type: AUCTION_PRICE_REQUEST,
        data: data
    }
}

export const Auction_Price_SUCCESS = (data) => {
    return {
        type: AUCTION_PRICE_SUCCESS,
        data
    }
}

export const Auction_Price_ERROR = () => {
    return {
        type: AUCTION_PRICE_ERROR,
    }
}

/* 경매 마감 */
export const AuctionClose_REQUEST = (data) => {
    return {
        type: AUCTION_CLOSE_REQUEST,
        data: data
    }
}

export const AuctionClose_SUCCESS = () => {
    return {
        type: AUCTION_CLOSE_SUCCESS,
    }
}

export const AuctionClose_ERROR = () => {
    return {
        type: AUCTION_CLOSE_ERROR,
    }
}



type AuctionAction =
    | ReturnType<typeof Auction_Price_REQUEST>
    | ReturnType<typeof Auction_Price_SUCCESS>
    | ReturnType<typeof Auction_Price_ERROR>

    | ReturnType<typeof Auction_Current_REQUEST>
    | ReturnType<typeof Auction_Current_SUCCESS>
    | ReturnType<typeof Auction_Current_ERROR>

    | ReturnType<typeof AuctionClose_REQUEST>
    | ReturnType<typeof AuctionClose_SUCCESS>
    | ReturnType<typeof AuctionClose_ERROR>



const reducer = (state: AuctionState = initialState, action: AuctionAction) => {
    switch (action.type) {
        /* 경매 가격 */
        case AUCTION_PRICE_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case AUCTION_PRICE_SUCCESS:
            return {
                ...state,
            }
        case AUCTION_PRICE_ERROR:
            return {
                ...state,
            }

        /* 경매 참여 */
        case AUCTION_CURRENT_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case AUCTION_CURRENT_SUCCESS:

            return {
                ...state,
                current: action.current,
                endDate: action.endDate,
                buyer: action.buyer,
                prevWallet: action.prevWallet,
                prevAmount: action.prevAmount,
            }
        case AUCTION_CURRENT_ERROR:
            return {
                ...state,
            }

        /* 경매 종료 */
        case AUCTION_CLOSE_REQUEST:            
            return {
                ...state,
                endIdx : action.data
            }
        case AUCTION_CLOSE_SUCCESS:
            return {
                ...state,

            }
        case AUCTION_CLOSE_ERROR:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default reducer