import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper';



export interface UserState {
    loadding: boolean;
    payload: {};
    error: string;
    UserAddress: string;
    verify: number;
    NickName: string;
    Address: string;
    Email: string;
    signupBool: boolean;
    userList: Array<any>;
    loginBool: boolean;
}

export const initialState: UserState = {
    loadding: false,
    payload: {},
    error: '32523523',
    UserAddress: 'kaikasAddress',
    verify: 0,
    NickName: '',
    Address: '',
    Email: '',
    signupBool: false,
    userList: [],
    loginBool: false
};



export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST" as const;
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS" as const;
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR" as const;

export const SELLER_ADMIN_REQUEST = "SELLER_ADMIN_REQUEST" as const;
export const SELLER_ADMIN_SUCCESS = "SELLER_ADMIN_SUCCESS" as const;
export const SELLER_ADMIN_ERROR = "SELLER_ADMIN_ERROR" as const;

export const SELLER_ADMIN_WAIT_REQUEST= "SELLER_ADMIN_WAIT_REQUEST" as const;
export const SELLER_ADMIN_WAIT_SUCCESS = "SELLER_ADMIN_WAIT_SUCCESS" as const;
export const SELLER_ADMIN_WAIT_ERROR = "SELLER_ADMIN_WAIT_ERROR" as const;

export const SELLER_ADMIN_ACCESS_REQUEST = "SELLER_ADMIN_ACCESS_REQUEST" as const;
export const SELLER_ADMIN_ACCESS_SUCCESS = "SELLER_ADMIN_ACCESS_SUCCESS" as const;
export const SELLER_ADMIN_ACCESS_ERROR = "SELLER_ADMIN_ACCESS_ERROR" as const;

export const SELLER_ADMIN_DENY_REQUEST = "SELLER_ADMIN_DENY_REQUEST" as const;
export const SELLER_ADMIN_DENY_SUCCESS = "SELLER_ADMIN_DENY_SUCCESS" as const;
export const SELLER_ADMIN_DENY_ERROR = "SELLER_ADMIN_DENY_ERROR" as const;

export const SIGNUP_POST_REQUEST = "SIGNUP_POST_REQUEST" as const;
export const SIGNUP_POST_SUCCESS = "SIGNUP_POST_SUCCESS" as const;
export const SIGNUP_POST_ERROR = "SIGNUP_POST_ERROR" as const;

export const NICKNAME_POST_REQUEST = "NICKNAME_POST_REQUEST" as const;
export const NICKNAME_POST_SUCCESS = "NICKNAME_POST_SUCCESS" as const;
export const NICKNAME_POST_ERROR = "NICKNAME_POST_ERROR" as const;

export const USER_LIST_REQUEST = "USER_LIST_REQUEST" as const;
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS" as const;
export const USER_LIST_ERROR = "USER_LIST_ERROR" as const;


/* User Login req */
export const UserLogin_REQUEST = (UserAddress) => {
    return {
        type: USER_LOGIN_REQUEST,
        data: UserAddress
    }
}
export const UserLogin_SUCCESS = (klaytnAddress) => {
    return {
        type: USER_LOGIN_SUCCESS,
        data: klaytnAddress.UserAddress
    }
}
export const UserLogin_ERROR = (error) => {
    return {
        type: USER_LOGIN_ERROR,
        error: error,
    }
}

/* seller admin req */
export const SellerAdminWait_REQUEST = (data) => {
    return {
        type: SELLER_ADMIN_WAIT_REQUEST,
        data: data
    }
}
export const SellerAdminWait_SUCCESS = () => {
    return {
        type: SELLER_ADMIN_WAIT_SUCCESS,
    }
}
export const SellerAdminWait_ERROR = () => {
    return {
        type: SELLER_ADMIN_WAIT_ERROR,
    }
}



/* seller admin req */
export const SellerAdmin_REQUEST = (data) => {
    return {
        type: SELLER_ADMIN_REQUEST,
        data: data
    }
}
export const SellerAdmin_SUCCESS = () => {
    return {
        type: SELLER_ADMIN_SUCCESS,
    }
}
export const SellerAdmin_ERROR = () => {
    return {
        type: SELLER_ADMIN_ERROR,
    }
}


/* sign up succ */
export const SignUp_REQUEST = (data) => {
    return {
        type: SIGNUP_POST_REQUEST,
        data
    }
}

export const SignUp_SUCCESS = (data) => {
    return {
        type: SIGNUP_POST_SUCCESS,
        data
    }
}

export const SignUp_ERROR = (data) => {
    return {
        type: SIGNUP_POST_ERROR,
        data
    }
}

/* signup nickname chk succ */
export const Nickname_REQUEST = (data) => {
    return {
        type: NICKNAME_POST_REQUEST,
        data
    }
}

export const Nickname_SUCCESS = (data) => {
    return {
        type: NICKNAME_POST_SUCCESS,
        data
    }
}

export const Nickname_ERROR = (data) => {
    return {
        type: NICKNAME_POST_ERROR,
        data
    }
}


/* user list req */
export const Userlist_REQUEST = () => {
    return {
        type: USER_LIST_REQUEST,
    }
}

export const UserList_SUCCESS = (data) => {
    console.log(data)
    return {
        type: USER_LIST_SUCCESS,
        data: data
    }
}

export const UserList_ERROR = () => {
    return {
        type: USER_LIST_ERROR,
    }
}

/* 승인 반려 처리 reducer만 사용 */
export const SellerAdminAccess_REQUEST = (data) => {
    return {
        type: SELLER_ADMIN_ACCESS_REQUEST,
        data:data
    }
}
export const SellerAdminAccess_SUCCESS = () => {
    return {
        type: SELLER_ADMIN_ACCESS_SUCCESS,

    }
}
export const SellerAdminAccess_ERROR = () => {
    return {
        type: SELLER_ADMIN_ACCESS_ERROR,

    }
}

/* 승인 반려 처리 reducer만 사용 */
export const SellerAdminDeny_REQUEST = (data) => {
    return {
        type: SELLER_ADMIN_DENY_REQUEST,
        data:data
    }
}
export const SellerAdminDeny_SUCCESS = () => {
    return {
        type: SELLER_ADMIN_DENY_SUCCESS,

    }
}
export const SellerAdminDeny_ERROR = () => {
    return {
        type: SELLER_ADMIN_DENY_ERROR,

    }
}

type UserAction =
    | ReturnType<typeof UserLogin_REQUEST>
    | ReturnType<typeof UserLogin_SUCCESS>
    | ReturnType<typeof UserLogin_ERROR>

    | ReturnType<typeof SellerAdmin_REQUEST>
    | ReturnType<typeof SellerAdmin_SUCCESS>
    | ReturnType<typeof SellerAdmin_ERROR>

    | ReturnType<typeof SignUp_REQUEST>
    | ReturnType<typeof SignUp_SUCCESS>
    | ReturnType<typeof SignUp_ERROR>

    | ReturnType<typeof Nickname_REQUEST>
    | ReturnType<typeof Nickname_SUCCESS>
    | ReturnType<typeof Nickname_ERROR>

    | ReturnType<typeof Userlist_REQUEST>
    | ReturnType<typeof UserList_SUCCESS>
    | ReturnType<typeof UserList_ERROR>

    | ReturnType<typeof SellerAdminAccess_REQUEST>
    | ReturnType<typeof SellerAdminAccess_SUCCESS>
    | ReturnType<typeof SellerAdminAccess_ERROR>

    | ReturnType<typeof SellerAdminDeny_REQUEST>
    | ReturnType<typeof SellerAdminDeny_SUCCESS>
    | ReturnType<typeof SellerAdminDeny_ERROR>

    | ReturnType<typeof SellerAdminWait_REQUEST>
    | ReturnType<typeof SellerAdminWait_SUCCESS>
    | ReturnType<typeof SellerAdminWait_ERROR>

const reducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        /********* */
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                UserAddress: action.data
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                data: action.data
            }

        case USER_LOGIN_ERROR:
            return {
                ...state,
                data: action.error
            }

                    /********* */
        case SELLER_ADMIN_WAIT_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case SELLER_ADMIN_WAIT_SUCCESS:
            return {
                ...state,

            }

        case SELLER_ADMIN_WAIT_ERROR:
            return {
                ...state,

            }


        /*********** */
        case SELLER_ADMIN_REQUEST:
            return {
                ...state,

            }
        case SELLER_ADMIN_SUCCESS:
            return {
                ...state,
            }
        case SELLER_ADMIN_ERROR:
            return {
                ...state,
            }
        /*********** */
        case SELLER_ADMIN_ACCESS_REQUEST:
            return {
                ...state,
            }
        case SELLER_ADMIN_ACCESS_SUCCESS:
            return {
                ...state,
            } 
        case SELLER_ADMIN_ACCESS_ERROR:
            return {
                ...state,
            } 
        /*********** */
        case SELLER_ADMIN_DENY_REQUEST:
            return {
                ...state,
            }
        case SELLER_ADMIN_DENY_SUCCESS:
            return {
                ...state,
            } 
        case SELLER_ADMIN_DENY_ERROR:
            return {
                 ...state,
            } 
        /* 회원가입 */
        case SIGNUP_POST_REQUEST:
            return {
                ...state,
            }
        case SIGNUP_POST_SUCCESS:
            return {
                ...state,
                signupBool: true
            }
        case SIGNUP_POST_ERROR:
            return {
                ...state,
                signupBool: false
            }

        /* 회원가입 닉네임 중복체크 */
        case NICKNAME_POST_REQUEST:
            return {
                ...state,
            }
        case NICKNAME_POST_SUCCESS:
            return {
                ...state,
            }
        case NICKNAME_POST_ERROR:
            return {
                ...state,
            }
        /* User list req */
        case USER_LIST_REQUEST:
            return {
                ...state,
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                userList: action.data
            }
        case USER_LIST_ERROR:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer