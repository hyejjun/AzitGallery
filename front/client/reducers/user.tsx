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
    nicknameChkBool: boolean;
    userInfo: {};
    userIdx: number;
    emailBool: boolean;
    adminApproval: number;
    emailValidation: boolean;
    sellerBool : boolean;
    itemcode: string;
    check: boolean;
    data: any
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
    loginBool: false,
    nicknameChkBool: false,
    userInfo: {},
    userIdx: 0,
    emailBool: false,
    adminApproval: 0,
    emailValidation: false,
    sellerBool : false,
    itemcode: '',
    check: false,
    data: []
};



export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST" as const;
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS" as const;
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR" as const;

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST" as const;
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS" as const;
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR" as const;

export const SELLER_ADMIN_REQUEST = "SELLER_ADMIN_REQUEST" as const;
export const SELLER_ADMIN_SUCCESS = "SELLER_ADMIN_SUCCESS" as const;
export const SELLER_ADMIN_ERROR = "SELLER_ADMIN_ERROR" as const;

export const SELLER_ADMIN_WAIT_REQUEST = "SELLER_ADMIN_WAIT_REQUEST" as const;
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

export const EMAIL_POST_REQUEST = "EMAIL_POST_REQUEST" as const;
export const EMAIL_POST_SUCCESS = "EMAIL_POST_SUCCESS" as const;
export const EMAIL_POST_ERROR = "EMAIL_POST_ERROR" as const;

export const USER_LIST_REQUEST = "USER_LIST_REQUEST" as const;
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS" as const;
export const USER_LIST_ERROR = "USER_LIST_ERROR" as const;

export const USER_INFO_REQUEST = "USER_INFO_REQUEST" as const;
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS" as const;
export const USER_INFO_ERROR = "USER_INFO_ERROR" as const;

export const UPDATE_SHIP_STATE_REQUEST = "UPDATE_SHIP_STATE_REQUEST" as const;
export const UPDATE_SHIP_STATE_SUCCESS = "UPDATE_SHIP_STATE_SUCCESS" as const;
export const UPDATE_SHIP_STATE_ERROR = "UPDATE_SHIP_STATE_ERROR" as const;

export const ADMIN_APPROVAL_CHECK_REQUEST = "ADMIN_APPROVAL_CHECK_REQUEST" as const;
export const ADMIN_APPROVAL_CHECK_SUCCESS = "ADMIN_APPROVAL_CHECK_SUCCESS" as const;
export const ADMIN_APPROVAL_CHECK_ERROR = "ADMIN_APPROVAL_CHECK_ERROR" as const;


/* User Login req */
export const UserLogin_REQUEST = (UserAddress) => {
    return {
        type: USER_LOGIN_REQUEST,
        data: UserAddress,
        loginBool: false,
    }
}
export const UserLogin_SUCCESS = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        //data: klaytnAddress.UserAddress
        loginBool: true,
        UserAddress: data.UserAddress,
        signupBool: data.signupBool,
        userIdx: data.userIdx,
        adminApproval: data.adminApproval,
        sellerBool: data.sellerBool,
    }
}
export const UserLogin_ERROR = (data) => {
    return {
        type: USER_LOGIN_ERROR,
        //error: error,
        signupBool: data.signupBool,

    }
}

/* User Logout req */
export const UserLogout_REQUEST = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    }
}
export const UserLogout_SUCCESS = (data) => {
    return {
        type: USER_LOGOUT_SUCCESS,
        UserAddress: 'kaikasAddress',
        loginBool: false,
        signupBool: false,
    }
}
export const UserLogout_ERROR = () => {
    return {
        type: USER_LOGOUT_ERROR,
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

export const Nickname_SUCCESS = () => {

    return {

        type: NICKNAME_POST_SUCCESS,

    }
}

export const Nickname_ERROR = () => {
    return {
        type: NICKNAME_POST_ERROR,

    }
}

/* 회원가입 이메일중복 체크  */
export const Email_REQUEST = (data) => {
    return {
        type: EMAIL_POST_REQUEST,
        data
    }
}

export const Email_SUCCESS = (data) => {
    return {

        type: EMAIL_POST_SUCCESS,
        data: data
    }
}

export const Email_ERROR = (data) => {
    return {
        type: EMAIL_POST_ERROR,
        data: data
    }
}


/* user list req */
export const Userlist_REQUEST = () => {
    return {
        type: USER_LIST_REQUEST,
    }
}

export const UserList_SUCCESS = (data) => {
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
        data: data
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
        data: data
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

/* userinfo req */
export const UserInfo_REQUEST = (data) => {
    return {
        type: USER_INFO_REQUEST,
        data: data
    }
}

export const UserInfo_SUCCESS = (userInfo) => {
    return {
        type: USER_INFO_SUCCESS,
        data: userInfo
    }
}

export const UserInfo_ERROR = () => {
    return {
        type: USER_INFO_ERROR,
    }
}

export const Update_ship_state_REQUEST = (data) => {
    return {
        type: UPDATE_SHIP_STATE_REQUEST,
        data
    }
}

export const Update_ship_state_SUCCESS = (data) => {
    return {
        type: UPDATE_SHIP_STATE_SUCCESS,
        data
    }
}

export const Update_ship_state_ERROR = () => {
    return {
        type: UPDATE_SHIP_STATE_ERROR,


    }
}


/* 인증받은 판매자인지 체크 */

export const AdminApprovalCheck_REQUEST = (data) => {
    return {
        type: ADMIN_APPROVAL_CHECK_REQUEST,
        data
    }
}

export const AdminApprovalCheck_SUCCESS = (data) => {
    return {
        type: ADMIN_APPROVAL_CHECK_SUCCESS,
        adminApproval : data
    }
}

export const AdminApprovalCheck_ERROR = () => {
    return {
        type: ADMIN_APPROVAL_CHECK_ERROR,
    }
}





type UserAction =
    | ReturnType<typeof UserLogin_REQUEST>
    | ReturnType<typeof UserLogin_SUCCESS>
    | ReturnType<typeof UserLogin_ERROR>

    | ReturnType<typeof UserLogout_REQUEST>
    | ReturnType<typeof UserLogout_SUCCESS>
    | ReturnType<typeof UserLogout_ERROR>

    | ReturnType<typeof SellerAdmin_REQUEST>
    | ReturnType<typeof SellerAdmin_SUCCESS>
    | ReturnType<typeof SellerAdmin_ERROR>

    | ReturnType<typeof SignUp_REQUEST>
    | ReturnType<typeof SignUp_SUCCESS>
    | ReturnType<typeof SignUp_ERROR>

    | ReturnType<typeof Nickname_REQUEST>
    | ReturnType<typeof Nickname_SUCCESS>
    | ReturnType<typeof Nickname_ERROR>

    | ReturnType<typeof Email_REQUEST>
    | ReturnType<typeof Email_SUCCESS>
    | ReturnType<typeof Email_ERROR>

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

    | ReturnType<typeof UserInfo_REQUEST>
    | ReturnType<typeof UserInfo_SUCCESS>
    | ReturnType<typeof UserInfo_ERROR>

    | ReturnType<typeof Update_ship_state_REQUEST>
    | ReturnType<typeof Update_ship_state_SUCCESS>
    | ReturnType<typeof Update_ship_state_ERROR>

    | ReturnType<typeof AdminApprovalCheck_REQUEST>
    | ReturnType<typeof AdminApprovalCheck_SUCCESS>
    | ReturnType<typeof AdminApprovalCheck_ERROR>


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
                //data: action.data
                loginBool: true,
                UserAddress: action.UserAddress,
                signupBool: action.signupBool,
                userIdx: action.userIdx,
                adminApproval: action.adminApproval,
                sellerBool : action.sellerBool
            }

        case USER_LOGIN_ERROR:
            return {
                ...state,
                //data: action.error
                signupBool: action.signupBool
            }

        case USER_LOGOUT_REQUEST:
            return {
                ...state,
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                UserAddress: action.UserAddress,
                loginBool: false
            }

        case USER_LOGOUT_ERROR:
            return {
                ...state,
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
                data: action.data
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
                data: action.data
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
                nicknameChkBool: true
            }
        case NICKNAME_POST_ERROR:
            return {
                ...state,
                nicknameChkBool: false
            }


        /* 회원가입 이메일 중복체크 */
        case EMAIL_POST_REQUEST:
            return {
                ...state,
            }
        case EMAIL_POST_SUCCESS:
            return {
                ...state,
                emailBool: action.data.flag
            }
        case EMAIL_POST_ERROR:
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
        /*  user info req   */
        case USER_INFO_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case USER_INFO_SUCCESS:
            return {
                ...state,
                adminApproval: action.data.admin_approval,
                emailValidation: action.data.email_validation,
                NickName: action.data.result.nick_name,
                Address: action.data.result.kaikas_address,
                Email: action.data.result.email
            }
        case USER_INFO_ERROR:
            return {
                ...state,
            }

        case UPDATE_SHIP_STATE_REQUEST:
            return {
                ...state,
                data: action.data
            }
        case UPDATE_SHIP_STATE_SUCCESS:
            return {
                ...state,
                check: action.data
            }
        case UPDATE_SHIP_STATE_ERROR:
            return {
                ...state
            }

        case ADMIN_APPROVAL_CHECK_REQUEST:
            return {
                ...state,
                data : action.data
            }
        case ADMIN_APPROVAL_CHECK_SUCCESS:
     
            return {
                ...state,
                adminApproval : action.adminApproval
            }
        case ADMIN_APPROVAL_CHECK_ERROR:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default reducer