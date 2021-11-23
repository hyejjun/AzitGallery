import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface AuctionState {
    current: number
    endDate: Date
    now: Date
    yourBalacne : number
}

export const initialState: AuctionState = {
    current: 0,
    endDate: new Date(),
    now: new Date(),
    yourBalacne : 0
};


/* 경매 참여자 잔액 확인 */
export const GET_BALANCE_REQUEST = "GET_BALANCE_REQUEST" as const;
export const GET_BALANCE_SUCCESS = "GET_BALANCE_SUCCESS" as const;
export const GET_BALANCE_ERROR = "GET_BALANCE_ERROR" as const;


/* 경매 현재가 가져오기 */
export const AUCTION_PRICE_REQUEST = "AUCTION_PRICE_REQUEST" as const;
export const AUCTION_PRICE_SUCCESS = "AUCTION_PRICE_SUCCESS" as const;
export const AUCTION_PRICE_ERROR = "AUCTION_PRICE_ERROR" as const;


/* 경매 신청 */
export const AUCTION_CURRENT_REQUEST = "AUCTION_CURRENT_REQUEST" as const;
export const AUCTION_CURRENT_SUCCESS = "AUCTION_CURRENT_SUCCESS" as const;
export const AUCTION_CURRENT_ERROR = "AUCTION_CURRENT_ERROR" as const;


/* 경매 참여자 잔액 확인 */
export const getBalance_REQUEST = (data) => {
    return {
        type: GET_BALANCE_REQUEST,
        data
    }
}

export const getBalance_SUCCESS = (data) => {
    return {
        type: GET_BALANCE_SUCCESS,
        data
    }
}

export const getBalance_ERROR = () => {
    return {
        type: GET_BALANCE_ERROR,
    }
}


/* 경매 현재가 가져오기 */
export const Auction_Current_REQUEST = (data) => {
    return {
        type: AUCTION_CURRENT_REQUEST,
        data: data
    }
}

export const Auction_Current_SUCCESS = (current, endDate) => {
    return {
        type: AUCTION_CURRENT_SUCCESS,
        current: current,
        endDate: endDate
    }
}

export const Auction_Current_ERROR = () => {
    return {
        type: AUCTION_CURRENT_ERROR,
    }
}

/* 경매 신청 */
export const Auction_Price_REQUEST = (data) => {
    return {
        type: AUCTION_PRICE_REQUEST,
        data: data
    }
}

export const Auction_Price_SUCCESS = () => {
    return {
        type: AUCTION_PRICE_SUCCESS,
    }
}

export const Auction_Price_ERROR = () => {
    return {
        type: AUCTION_PRICE_ERROR,
    }
}





type AuctionAction =
    | ReturnType<typeof getBalance_REQUEST>
    | ReturnType<typeof getBalance_SUCCESS>
    | ReturnType<typeof getBalance_ERROR>

    | ReturnType<typeof Auction_Price_REQUEST>
    | ReturnType<typeof Auction_Price_SUCCESS>
    | ReturnType<typeof Auction_Price_ERROR>

    | ReturnType<typeof Auction_Current_REQUEST>
    | ReturnType<typeof Auction_Current_SUCCESS>
    | ReturnType<typeof Auction_Current_ERROR>



const reducer = (state: AuctionState = initialState, action: AuctionAction) => {
    switch (action.type) {
        /* 경매 참여자 잔액 확인 */
        
        case GET_BALANCE_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case GET_BALANCE_SUCCESS:    
            return {
                ...state,
                yourBalacne : action.data
            }
        case GET_BALANCE_ERROR:
            return {
                ...state,
            }

        /* 경매 현재가 가져오기 */
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

        /* 경매 신청 */
        case AUCTION_CURRENT_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case AUCTION_CURRENT_SUCCESS:
            // console.log(`여기까지도 되나?${action.endDate}`)
            return {
                ...state,
                current: action.current,
                endDate: action.endDate
            }
        case AUCTION_CURRENT_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer