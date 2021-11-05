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



export const MINT_NFT_SUCCESS  = "MINT_NFT_SUCCESS" as const;
export const MINT_NFT_RETURN  = "MINT_NFT_RETURN" as const;
export const KIP_TOKEN_SUCCESS = "KIP_TOKEN_SUCCESS" as const;
export const KIP_SWAP_REQUEST = "KIP_SWAP_REQUEST" as const;

export const MintNFT_REQUEST = (data) => {
    return{
        type:MINT_NFT_SUCCESS,
        data:data,
    }
}

export const MintNFT_RETURN = () => {
    return{
        type:MINT_NFT_RETURN,
    }
}

export const KipToken_SUCCESS = () => {
    return{
        type:KIP_TOKEN_SUCCESS,
    }
}

export const KipSwap_REQUEST = () => {
    return{
        type:KIP_SWAP_REQUEST,
    }
}

type MintAction = 
| ReturnType<typeof MintNFT_REQUEST>
| ReturnType<typeof MintNFT_RETURN>
| ReturnType<typeof KipToken_SUCCESS>
| ReturnType<typeof KipSwap_REQUEST>

const reducer = (state:MintState=initialState, action:MintAction) => {
    switch (action.type){
        case MINT_NFT_SUCCESS:
            return{
                ...state,
                verify:'reducer?'
            }
        case MINT_NFT_RETURN:
            return{
                ...state,
                verify:'return?'
            }
        case KIP_TOKEN_SUCCESS:
            return{
                ...state,
                verify:'return?'
            }
        case KIP_SWAP_REQUEST:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer