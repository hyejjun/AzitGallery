import {AnyAction} from 'redux'
import {HYDRATE} from 'next-redux-wrapper';



export interface ListState {
    itemList: Array<any>;
    listlength: number;
    auctionList: Array<any>;
    auctionlength: number;
    mynftList: Array<any>;
    soldnftList: Array<any>;
    notsellnftList : Array<any>;
    view: boolean;
}

export const initialState : ListState = {
    itemList: [],
    listlength: 3,
    auctionList: [],
    auctionlength: 3,
    mynftList : [],
    soldnftList : [],
    notsellnftList : [],
    view: false,
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

export const ITEM_LIST_SEARCH_REQUEST = "ITEM_LIST_SEARCH_REQUEST" as const;
export const ITEM_LIST_SEARCH_SUCCESS = "ITEM_LIST_SEARCH_SUCCESS" as const;
export const ITEM_LIST_SEARCH_ERROR = "ITEM_LIST_SEARCH_ERROR" as const;

export const NOT_SELLED_REQUEST = "NOT_SELLED_REQUEST" as const;
export const NOT_SELLED_SUCCESS = "NOT_SELLED_SUCCESS" as const;
export const NOT_SELLED_ERROR = "NOT_SELLED_ERROR" as const;

export const ITEM_RECENT_REQUEST = "ITEM_RECENT_REQUEST" as const;
export const ITEM_RECENT_SUCCESS = "ITEM_RECENT_SUCCESS" as const;
export const ITEM_RECENT_ERROR = "ITEM_RECENT_ERROR" as const;

export const MY_NFT_ALL_REQUEST = "MY_NFT_ALL_REQUEST" as const;
export const MY_NFT_ALL_SUCCESS = "MY_NFT_ALL_SUCCESS" as const;
export const MY_NFT_ALL_ERROR = "MY_NFT_ALL_ERROR" as const;

export const SOLD_NFT_REQUEST = "SOLD_NFT_REQUEST" as const;
export const SOLD_NFT_SUCCESS = "SOLD_NFT_SUCCESS" as const;
export const SOLD_NFT_ERROR = "SOLD_NFT_ERROR" as const;

export const MYNFT_VIEW_REQUEST = "MYNFT_VIEW_REQUEST" as const;
export const MYNFT_VIEW_SUCCESS = "MYNFT_VIEW_SUCCESS" as const;
export const MYNFT_VIEW_ERROR = "MYNFT_VIEW_ERROR" as const;



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


/* mynft구매자 판매자 뷰 나누기 */
export const myNft_view_REQUEST = (data) => {
    return {
        type: MYNFT_VIEW_REQUEST,
        data: data
    }
}

export const myNft_view_SUCCESS = (data) => {
    return {
        type: MYNFT_VIEW_SUCCESS,
        data:data
    }
}

export const myNft_view_ERROR = () => {
    return {
        type: MYNFT_VIEW_ERROR,
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
    return {
        type: SET_QUERY_SUCCESS,

    }
}

export const SetQuery_ERROR = () => {
    return {
        type: SET_QUERY_ERROR,
    }
}

/* 내가 구매한 상품 전부 */
export const myNft_all_REQUEST = (data:string) => {
    return {
        type: MY_NFT_ALL_REQUEST,
        data: data
    }
}

export const myNft_all_SUCCESS = (data) => {
    return {
        type:MY_NFT_ALL_SUCCESS,
        data:data
    }
}

export const myNft_all_ERROR = () => {
    return {
        type:MY_NFT_ALL_ERROR
    }
}

/* 판매된 상품 전부 */
export const sold_nft_REQUEST = (data:string) => {
    return {
        type:SOLD_NFT_REQUEST,
        data:data
    }
}

export const sold_nft_SUCCESS = (data) => {
    return {
        type:SOLD_NFT_SUCCESS,
        data:data
    }
}

export const sold_nft_ERROR = () => {
    return {
        type:SOLD_NFT_ERROR,

    }
}


/* 미판매된 상품 전부 */
export const not_selled_REQUEST = (data:string) => {
    return {
        type:NOT_SELLED_REQUEST,
        data:data
    }
}

export const not_selled_SUCCESS = (data) => {
    return {
        type:NOT_SELLED_SUCCESS,
        data:data
    }
}

export const not_selled_ERROR = () => {
    return {
        type:NOT_SELLED_ERROR,

    }
}















/* query에 해당하는 상품만 */

export const ItemGender_REQUEST = () => {
    return {
        type: ITEM_GENDER_REQUEST,
    }
}

export const ItemGender_SUCCESS = (data) => {
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

/* query에 해당하는 상품만 */

export const Item_List_Search_REQUEST = () => {
    return {
        type: ITEM_LIST_SEARCH_REQUEST,
    }
}

export const Item_List_Search_SUCCESS = (data) => {
    return {
        type: ITEM_LIST_SEARCH_SUCCESS,
        data: data
    }
}

export const Item_List_Search_ERROR = () => {
    return {
        type: ITEM_LIST_SEARCH_ERROR,
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
| ReturnType<typeof myNft_all_REQUEST>
| ReturnType<typeof myNft_all_SUCCESS>
| ReturnType<typeof myNft_all_ERROR>
| ReturnType<typeof sold_nft_REQUEST>
| ReturnType<typeof sold_nft_SUCCESS>
| ReturnType<typeof sold_nft_ERROR>
| ReturnType<typeof not_selled_REQUEST>
| ReturnType<typeof not_selled_SUCCESS>
| ReturnType<typeof not_selled_ERROR>
| ReturnType<typeof Item_List_Search_REQUEST>
| ReturnType<typeof Item_List_Search_SUCCESS>
| ReturnType<typeof Item_List_Search_ERROR>
| ReturnType<typeof myNft_view_REQUEST>
| ReturnType<typeof myNft_view_SUCCESS>
| ReturnType<typeof myNft_view_ERROR>


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
                auctionList: action.data,
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
            return{
                ...state,
                itemList: action.data
            }
        case ITEM_RECENT_ERROR:
            return{
                ...state,
            }

        case MY_NFT_ALL_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case MY_NFT_ALL_SUCCESS:
            return{
                ...state,
                mynftList:action.data       
            }
        case MY_NFT_ALL_ERROR:
            return{
                ...state
            }


        // mynft 구매자 판매자 뷰 나누기
        case MYNFT_VIEW_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case MYNFT_VIEW_SUCCESS:
            return{
                ...state,
                view:action.data.flag
            }
        case MYNFT_VIEW_ERROR:
            return{
                ...state
            }


        // /user/mynftall페이지 판매된 nft
        case SOLD_NFT_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case SOLD_NFT_SUCCESS:
            return{
                ...state,
                soldnftList:action.data
            }
        case SOLD_NFT_ERROR:
            return{
                ...state
            }
        // /user/mynftall페이지 미판매된 nft
        case NOT_SELLED_REQUEST:
            return{
                ...state,
                data:action.data
            }
        case NOT_SELLED_SUCCESS:
    
            return{
                ...state,
                notsellnftList:action.data
            }
        case NOT_SELLED_ERROR:
            return{
                ...state
            }

        case ITEM_LIST_SEARCH_REQUEST:
            return{
                ...state,
         
            }
        case ITEM_LIST_SEARCH_SUCCESS:

            return{
                ...state,
                itemList: action.data
            }
        case ITEM_LIST_SEARCH_ERROR:
            return{
                ...state,
        
            }
        

        default:
            return state;
    }
}

export default reducer