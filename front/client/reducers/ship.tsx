import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface ShipState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    error: string;
    UserAddress: string;
    verify: number;
    DeliveryArr:[{
        total_price:number,
        buyer:string,
        receiver:string,
        receiver_address:string,
        receiver_contact:string,
        memo:string,
        username:string,
        title:string
    }];
    itemcode:string;
    itemimg:number
    
}

export const initialState: ShipState = {
    loadding: false,
    data: [],
    payload: {},
    error: '',
    UserAddress: 'kaikasAddress',
    verify: 200,
    DeliveryArr:[{
        total_price:0,
        buyer:'algml',
        receiver:'algml',
        receiver_address:'강동구 천호 3동 21-125 102호',
        receiver_contact:'010-1222-2562',
        memo:'집앞에 놓아주세요',
        username:'미희',
        title:'따뜻한 겨울 패딩'
    }],
    itemcode:'',
    itemimg:0
};

/* 구매자 :  배송 정보 입력하기 */
export const SHIPINFO_INSERT_REQUEST = "SHIPINFO_INSERT_REQUEST" as const;
export const SHIPINFO_INSERT_SUCCESS = "SHIPINFO_INSERT_SUCCESS" as const;
export const SHIPINFO_INSERT_ERROR = "SHIPINFO_INSERT_ERROR" as const;

/* 판매자 : 운송장 등록하기 */
export const DELIVERYINFO_INSERT_REQUEST = "DELIVERYINFO_INSERT_REQUEST" as const;
export const DELIVERYINFO_INSERT_SUCCESS = "DELIVERYINFO_INSERT_SUCCESS" as const;
export const DELIVERYINFO_INSERT_ERROR = "DELIVERYINFO_INSERT_ERROR" as const;

/* 배송 완료 후 정보 */
export const DELIVERY_CUSTOMER_REQUEST = "DELIVERY_CUSTOMER_REQUEST" as const;
export const DELIVERY_CUSTOMER_SUCCESS = "DELIVERY_CUSTOMER_SUCCESS" as const;
export const DELIVERY_CUSTOMER_ERROR = "DELIVERY_CUSTOMER_ERROR" as const;



/* 구매자 :  배송 정보 입력하기 */
export const shipInfo_REQUEST = (data) => {
    return {
        type: SHIPINFO_INSERT_REQUEST,
        data: data
    }
}

export const shipInfo_SUCCESS = () => {
    return {
        type: SHIPINFO_INSERT_SUCCESS,
    }
}

export const shipInfo_ERROR = () => {
    return {
        type: SHIPINFO_INSERT_ERROR,
    }
}



/* 판매자 : 운송장 등록하기 */
export const deliveryInfo_REQUEST = (data) => {
    return {
        type: DELIVERYINFO_INSERT_REQUEST,
        data
    }
}

export const deliveryInfo_SUCCESS = () => {
    return {
        type: DELIVERYINFO_INSERT_SUCCESS,
    }
}

export const deliveryInfo_ERROR = () => {
    return {
        type: DELIVERYINFO_INSERT_ERROR,
    }
}


/* 배송 완료 후 정보 */
export const delivery_customer_REQUEST = (data) => {
    return {
        type: DELIVERY_CUSTOMER_REQUEST,
        data:data
    }
}

export const delivery_customer_SUCCESS = (data) => {
    return {
        type: DELIVERY_CUSTOMER_SUCCESS,
        data:data
    }
}

export const delivery_customer_ERROR = () => {
    return {
        type: DELIVERY_CUSTOMER_ERROR,
    }
}

type ShipAction =
    | ReturnType<typeof shipInfo_REQUEST>
    | ReturnType<typeof shipInfo_SUCCESS>
    | ReturnType<typeof shipInfo_ERROR>

    | ReturnType<typeof deliveryInfo_REQUEST>
    | ReturnType<typeof deliveryInfo_SUCCESS>
    | ReturnType<typeof deliveryInfo_ERROR>

    | ReturnType<typeof delivery_customer_REQUEST>
    | ReturnType<typeof delivery_customer_SUCCESS>
    | ReturnType<typeof delivery_customer_ERROR>

const reducer = (state: ShipState = initialState, action: ShipAction) => {
    switch (action.type) {
        /* 구매자 :  배송 정보 입력하기 */
        case SHIPINFO_INSERT_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case SHIPINFO_INSERT_SUCCESS:
            return {
                ...state,
            }
        case SHIPINFO_INSERT_ERROR:
            return {
                ...state,
            }

        /* 판매자 : 운송장 등록하기 */
        case DELIVERYINFO_INSERT_REQUEST:
            return {
                ...state,
            }
        case DELIVERYINFO_INSERT_SUCCESS:
            return {
                ...state,
            }
        case DELIVERYINFO_INSERT_ERROR:
            return {
                ...state,
            }

        /* 구매 완료 후 배송 정보 */
        case DELIVERY_CUSTOMER_REQUEST:
            return {
                ...state
                }
        case DELIVERY_CUSTOMER_SUCCESS:
            return {
                ...state,
                DeliveryArr:action.data
            }
        case DELIVERY_CUSTOMER_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer