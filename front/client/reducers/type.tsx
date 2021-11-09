import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface TypeState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    error: string;
    UserAddress: string;
    verify: number;
    categoryData: Array<any>
}

export const initialState: TypeState = {
    loadding: false,
    data: [],
    payload: {},
    error: '',
    UserAddress: 'kaikasAddress',
    verify: 200,
    categoryData: []
    
};

/* 판매 경매 선택 */
export const SELECT_SELLTYPE_REQUEST = "SELECT_SELLTYPE_REQUEST" as const;
export const SELECT_SELLTYPE_SUCCESS = "SELECT_SELLTYPE_SUCCESS" as const;
export const SELECT_SELLTYPE_ERROR = "SELECT_SELLTYPE_ERROR" as const;

/* 카테고리 선택 */
export const SELECT_CATEGORY_REQUEST = "SELECT_CATEGORY_REQUEST" as const;
export const SELECT_CATEGORY_SUCCESS = "SELECT_CATEGORY_SUCCESS" as const;
export const SELECT_CATEGORY_ERROR = "SELECT_CATEGORY_ERROR" as const;

/* 상품 검색 */
export const ITEM_SEARCH_REQUEST = "ITEM_SEARCH_REQUEST" as const;
export const ITEM_SEARCH_SUCCESS = "ITEM_SEARCH_SUCCESS" as const;
export const ITEM_SEARCH_ERROR = "ITEM_SEARCH_ERROR" as const;

/* 상품 정렬 - 최근발행 | 인기 많은 순 */
export const ITEM_SORT_REQUEST = "ITEM_SORT_REQUEST" as const;
export const ITEM_SORT_SUCCESS = "ITEM_SORT_SUCCESS" as const;
export const ITEM_SORT_ERROR = "ITEM_SORT_ERROR" as const;

/******************************************************************* */

/* 판매 경매 선택 */
export const sellType_REQUEST = (data) => {
    return {
        type: SELECT_SELLTYPE_REQUEST,
        data
    }
}

export const sellType_SUCCESS = () => {
    return {
        type: SELECT_SELLTYPE_SUCCESS,
    }
}

export const sellType_ERROR = () => {
    return {
        type: SELECT_SELLTYPE_ERROR,
    }
}

/* 카테고리 선택 */
export const genderCategorySelect_REQUEST = (data) => {
    return {
        type: SELECT_CATEGORY_REQUEST,
        data
    }
}

export const genderCategorySelect_SUCCESS = (data) => {
    return {
        type: SELECT_CATEGORY_SUCCESS,
        data: data
    }
}

export const genderCategorySelect_ERROR = () => {
    return {
        type: SELECT_CATEGORY_ERROR,
    }
}

/* 상품 검색 */
export const itemSearch_REQUEST = (data) => {
    return {
        type: ITEM_SEARCH_REQUEST,
        data
    }
}

export const itemSearch_SUCCESS = () => {
    return {
        type: ITEM_SEARCH_SUCCESS,
    }
}

export const itemSearch_ERROR = () => {
    return {
        type: ITEM_SEARCH_ERROR,
    }
}

/* 상품 정렬 - 최근발행 | 인기 많은 순 */
export const itemSort_REQUEST = (data) => {
    return {
        type: ITEM_SORT_REQUEST,
        data
    }
}

export const itemSort_SUCCESS = () => {
    return {
        type: ITEM_SORT_SUCCESS,
    }
}

export const itemSort_ERROR = () => {
    return {
        type: ITEM_SORT_ERROR,
    }
}


type TypeAction =
    | ReturnType<typeof sellType_REQUEST>
    | ReturnType<typeof sellType_SUCCESS>
    | ReturnType<typeof sellType_ERROR>
    | ReturnType<typeof genderCategorySelect_REQUEST>
    | ReturnType<typeof genderCategorySelect_SUCCESS>
    | ReturnType<typeof genderCategorySelect_ERROR>
    | ReturnType<typeof itemSearch_REQUEST>
    | ReturnType<typeof itemSearch_SUCCESS>
    | ReturnType<typeof itemSearch_ERROR>
    | ReturnType<typeof itemSort_REQUEST>
    | ReturnType<typeof itemSort_SUCCESS>
    | ReturnType<typeof itemSort_ERROR>

const reducer = (state: TypeState = initialState, action: TypeAction) => {
    switch (action.type) {
        /* 판매 경매 선택 */
        case SELECT_SELLTYPE_REQUEST:
            return {
                ...state,
                sellTypeData : action.data
            }
        case SELECT_SELLTYPE_SUCCESS:
            return {
                ...state,

            }
        case SELECT_SELLTYPE_ERROR:
            return {
                ...state,
            }

        /* 카테고리 선택 */
        case SELECT_CATEGORY_REQUEST:
            return {
                ...state,
                categoryData : action.data
            }
        case SELECT_CATEGORY_SUCCESS:
    
            return {
                ...state,
                categoryData : action.data
            }
        case SELECT_CATEGORY_ERROR:
            return {
                ...state,
            }

        /* 상품 검색 */
        case ITEM_SEARCH_REQUEST:
            return {
                ...state,
                searchData : action.data
            }
        case ITEM_SEARCH_SUCCESS:
            return {
                ...state,
            }
        case ITEM_SEARCH_ERROR:
            return {
                ...state,
            }

        /* 상품 정렬 - 최근발행 | 인기 많은 순 */
        case ITEM_SORT_REQUEST:
            return {
                ...state,
                sortData : action.data
            }
        case ITEM_SORT_SUCCESS:
            return {
                ...state,
            }
        case ITEM_SORT_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer