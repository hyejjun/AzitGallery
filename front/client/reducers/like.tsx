import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface LikeState {
    loadding: boolean;
    data: Array<string | number | Object>;
    payload: {};
    error: string;
    likeStatus: boolean;
    itemIdx: string;
    likeList:Array<string | number | Object>,
    likeBool :boolean;

}

export const initialState: LikeState = {
    loadding: false,
    data: [],
    payload: {},
    error: '',
    likeStatus: false,
    itemIdx: '',
    likeList:[],
    likeBool : false,
};

/* user 별로 좋아요 한 상품 INSERT */
export const LIKE_INSERT_REQUEST = "LIKE_INSERT_REQUEST" as const;
export const LIKE_INSERT_SUCCESS = "LIKE_INSERT_SUCCESS" as const;
export const LIKE_INSERT_ERROR = "LIKE_INSERT_ERROR" as const;


/* user 별로 좋아요 한 상품 전체 list */
export const LIKE_LIST_REQUEST = "LIKE_LIST_REQUEST" as const;
export const LIKE_LIST_SUCCESS = "LIKE_LIST_SUCCESS" as const;
export const LIKE_LIST_ERROR = "LIKE_LIST_ERROR" as const;

/* user 별로 좋아요 한 상품 INSERT */
export const likeInsert_REQUEST = (data) => {

    return {
        type: LIKE_INSERT_REQUEST,
        data,

    }
}

export const likeInsert_SUCCESS = (data) => {
    console.log(data);

    return {
        type: LIKE_INSERT_SUCCESS,
        itemIdx: data.itemIdx,
        likeStatus: data.likeStatus,
        likeBool:data.likeBool
    }
}

export const likeInsert_ERROR = () => {
    return {
        type: LIKE_INSERT_ERROR,
    }
}

/* user 별로 좋아요 한 상품 전체 list */

export const likeList_REQUEST = (data) => {
    return {
        type: LIKE_LIST_REQUEST,
        data,
    }
}

export const likeList_SUCCESS = (data) => {
    return {
        type: LIKE_LIST_SUCCESS,
        likeList : data.like_list
    }
}

export const likeList_ERROR = () => {
    return {
        type: LIKE_LIST_ERROR,
    }
}


type LikeAction =
    | ReturnType<typeof likeInsert_REQUEST>
    | ReturnType<typeof likeInsert_SUCCESS>
    | ReturnType<typeof likeInsert_ERROR>

    | ReturnType<typeof likeList_REQUEST>
    | ReturnType<typeof likeList_SUCCESS>
    | ReturnType<typeof likeList_ERROR>


const reducer = (state: LikeState = initialState, action: LikeAction) => {
    switch (action.type) {
        /* user 별로 좋아요 한 상품 INSERT */
        case LIKE_INSERT_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case LIKE_INSERT_SUCCESS:
            console.log(action);
            
            return {
                ...state,
                itemIdx: action.itemIdx,
                likeStatus: action.likeStatus,
                likeBool: action.likeBool
            }
        case LIKE_INSERT_ERROR:
            return {
                ...state,
            }

        /* user 별로 좋아요 한 상품 전체 list */
        case LIKE_LIST_REQUEST:
            // console.log("여기 ==== ",action);
            
            return {
                ...state,
                // data: action.data
            }
        case LIKE_LIST_SUCCESS:
            console.log("리듀서 ======",action);
            
            return {
                ...state,
                likeList : action.likeList
            }
        case LIKE_LIST_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer