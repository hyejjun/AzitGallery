import {AnyAction} from 'redux'
import {HYDRATE} from 'next-redux-wrapper';



export interface MintState {
    loadding:boolean;
    data:Array<string | number | Object>;
    payload:{};
    error:string;
    UserAddress:string;
    verify:number;
}

export const initialState : MintState = {
    loadding:false,
    data:[],
    payload:{},
    error:'',
    UserAddress:'kaikasAddress',
    verify:200,
};



export const MINT_NFT_REQUEST  = "MINT_NFT_REQUEST" as const;
export const MINT_NFT_SUCCESS  = "MINT_NFT_SUCCESS" as const;
export const MINT_NFT_ERROR  = "MINT_NFT_ERROR" as const;

export const KIP_TOKEN_REQUEST= "KIP_TOKEN_REQUEST" as const;
export const KIP_TOKEN_SUCCESS = "KIP_TOKEN_SUCCESS" as const;
export const KIP_TOKEN_ERROR = "KIP_TOKEN_ERROR" as const;

export const KIP_SWAP_REQUEST = "KIP_SWAP_REQUEST" as const;
export const KIP_SWAP_SUCCESS = "KIP_SWAP_SUCCESS" as const;
export const KIP_SWAP_ERROR = "KIP_SWAP_ERROR" as const;

export const MintNFT_REQUEST = (data) => {
    return{
        type:MINT_NFT_REQUEST,
        data:data,
    }
}

export const MintNFT_SUCCESS = () => {
    return{
        type:MINT_NFT_SUCCESS,
    }
}
export const MintNFT_ERROR = () => {
    return{
        type:MINT_NFT_ERROR,
    }
}


export const KipToken_REQUEST = () => {
    return{
        type:KIP_TOKEN_REQUEST,
    }
}
export const KipToken_SUCCESS = () => {
    return{
        type:KIP_TOKEN_SUCCESS,
    }
}
export const KipToken_ERROR = () => {
    return{
        type:KIP_TOKEN_ERROR,
    }
}

export const KipSwap_REQUEST = () => {
    return{
        type:KIP_SWAP_REQUEST,
    }
}

export const KipSwap_SUCCESS = () => {
    return{
        type:KIP_SWAP_SUCCESS,
    }
}

export const KipSwap_ERROR = () => {
    return{
        type:KIP_SWAP_ERROR,
    }
}
type MintAction = 
| ReturnType<typeof MintNFT_REQUEST>
| ReturnType<typeof MintNFT_SUCCESS>
| ReturnType<typeof MintNFT_ERROR>

| ReturnType<typeof KipToken_REQUEST>
| ReturnType<typeof KipToken_SUCCESS>
| ReturnType<typeof KipToken_ERROR>

| ReturnType<typeof KipSwap_REQUEST>
| ReturnType<typeof KipSwap_SUCCESS>
| ReturnType<typeof KipSwap_ERROR>

const reducer = (state:MintState=initialState, action:MintAction) => {
    switch (action.type){
        case MINT_NFT_REQUEST:
            return{
                ...state,
                verify:'reducer?'
            }
        case MINT_NFT_SUCCESS:
            return{
                ...state,
                verify:'return?'
            }
        case MINT_NFT_ERROR:
            return{
                ...state,
                verify:'return?'
            }

        case KIP_TOKEN_REQUEST:
            return{
                ...state,
                verify:'return?'
            }        
        case KIP_TOKEN_SUCCESS:
            return{
                ...state,
                verify:'return?'
            }
        case  KIP_TOKEN_ERROR:
            return{
                ...state,
                verify :'return?'
            }

        case KIP_SWAP_REQUEST:
            return{
                ...state,
            }
        case KIP_SWAP_SUCCESS:
            return{
                ...state,
            }
        case KIP_SWAP_ERROR:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer