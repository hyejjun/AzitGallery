import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';

export interface DealState {
    dealInfo:object,
    orderInfo:Array<any>
}

export const initialState: DealState = {
    dealInfo:{},
    orderInfo:[]
}

export const DIRECT_DEAL_REQUEST = "DIRECT_DEAL_REQUEST"  as const;
export const DIRECT_DEAL_SUCCESS = "DIRECT_DEAL_SUCCESS" as const;
export const DIRECT_DEAL_ERROR = "DIRECT_DEAL_ERROR" as const;

export const direct_deal_REQUEST = (data) => {
    return{
        type:DIRECT_DEAL_REQUEST,
        data:data
    }
}
export const direct_deal_SUCCESS = (data) => {
    return{
        type:DIRECT_DEAL_SUCCESS,
        data:data
    }
}
export const direct_deal_ERROR = () => {
    return{
        type:DIRECT_DEAL_ERROR
    }
}

type DirectDealAction =
    | ReturnType<typeof direct_deal_REQUEST>
    | ReturnType<typeof direct_deal_SUCCESS>
    | ReturnType<typeof direct_deal_ERROR>


    const reducer = (state: DealState = initialState, action: DirectDealAction) => {
        switch(action.type){
            case DIRECT_DEAL_REQUEST:
                return{
                    ...state,
                    data:action.data
                }
            case DIRECT_DEAL_SUCCESS:
                console.log(action.data)
                return{
                    ...state,
                    orderInfo:action.data,
                    
                }
            case DIRECT_DEAL_ERROR:
                return{
                    ...state
                }
            default:
                return state;
        }
    }


    export default reducer

