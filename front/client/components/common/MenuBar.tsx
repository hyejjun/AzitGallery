import React, { useState, useEffect, useLayoutEffect } from 'react';
import Styled from 'styled-components';
import { setFlagsFromString } from 'v8';
import ModalBackground from './ModalBackground';
import RequireLogin from '../RequireLogin';
import LoginForm from './login/LoginForm';
import NeedCert from './login/NeedCert';
import Link from 'next/link';
import AddItemComponent from '../item/AddItemComponent';
import Btn from './Btn';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin_REQUEST, UserLogout_REQUEST } from '../../reducers/user';
// reducer 확인
import { RootState } from '../../reducers';
import axios from 'axios';

declare global {
    interface Window {
        klaytn: any;
        caver: any;
    }
}

const MenuBar = () => {
    /*
    const [loginState, setLoginState] = useState<boolean>(false)
    const [flag, setFlag] = useState<boolean>(false)
    const [Login, setLogin] = useState<boolean>(false)

    const loginClick = () => {
        loginState ? setLoginState(false) : setLoginState(true);
        setLogin(true)
    }
    const createBtn = () => {
        loginState == true ? setFlag(false) : setFlag(true)
    }
    const requireOpenBtn = () => {
        setFlag(prev => !prev)
    }
    const loginOpenBtn = () => {
        setFlag(prev => !prev)
        setLogin(prev => !prev)
    }
    const closeLoginForm = () => {
        setLogin(prev => !prev)
    }
*/
    const [loginState, setLoginState] = useState<boolean>(false)
    const [flag, setFlag] = useState<boolean>(false)
    const [Login, setLogin] = useState<boolean>(false)

    const loginClick = () => {
        loginState ? setLoginState(false) : setLoginState(true);
        setLogin(true)
    }
    const createBtn = () => {
        loginState == true ? setFlag(false) : setFlag(true)
    }   
    const requireOpenBtn = () => {
        setFlag(prev => !prev)
    }
    const loginOpenBtn = () => {
        setFlag(prev => !prev)
        setLogin(prev => !prev)
    }
    const closeLoginForm = () => {
        setLogin(prev => !prev)
    }

    /* 카이카스 로그인 */
    const [clicked, setClicked] = React.useState<boolean>(false)
    const [kaikasAddress, setKaikasAddress] = React.useState<string[]>([])
    const [Load, setLoad] = React.useState<boolean>(false)
    const User = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()

    const signupBool = useSelector((state: RootState) => state.user.signupBool) 

    const kaikasLogin = async () => {
        
        try {
            const wallet = await window.klaytn.enable()
            const klaytnAddress = window.klaytn.selectedAddress

            if (klaytnAddress != undefined) {
                let AddressArr = []
                AddressArr.push(klaytnAddress)
                setKaikasAddress(AddressArr)


                //dispatch(UserLogin_REQUEST(klaytnAddress))
                //console.log("signupBoolean ===== ", User.signupBool);


                // 카이카스 로그인 후 서명
                const account = window.klaytn.selectedAddress
                const message = 'Login User'
                const signedMessage = await window.caver.klay.sign(message, account)
                setLoad(true)

                if (signupBool == false) {
                    window.location.href = "/signup"
                } else if (signupBool == true) {
                    // window.location.href = "/"
                    setLoginState(true)
                    setLogin(false)
                    setFlag(false)
                } else {

                }
            }
        }catch(err){
            alert('로그인 실패')
        }
        
        
        
    }
    useEffect(() => {
        const klaytnAddress = window.klaytn.selectedAddress
        dispatch(UserLogin_REQUEST(klaytnAddress))
        if(window.klaytn.autoRefreshOnNetworkChange==false){
            alert('계정이 변경되었습니다.')
        }
    }, [Load])

    const onClick = () => {
        if (!window.klaytn) {
            return
        }
        setClicked(true)

        kaikasLogin()

    }

    useEffect(() => {
        setLoginState(false)
        if (User.loginBool === true) {
            setLoginState(false)
            setLogin(false)
            setFlag(false)
        }

    }, [])

    const login = () => {
        
        //setLoginState(true)
        setLogin(true)
        setFlag(false)

        const klaytnAddress = window.klaytn.selectedAddress
        dispatch(UserLogin_REQUEST(klaytnAddress))

    }

    const logout = () => {
        setLoginState(false)
        setLogin(false)
        setFlag(false)
        dispatch(UserLogout_REQUEST())
    }

    return (
        <>
            {
                flag
                    ?
                    <RequireLogin flag={flag} openBtn={requireOpenBtn} loginOpenBtn={loginOpenBtn} />   
                    : Login
                        ?
                        <LoginForm closeLogin={Login} closeLoginBtn={closeLoginForm} onClick={onClick} />
                        : <></>
            }
            <MenubarWrapper>
                <span><Link href="/"><a>Azit Gallery</a></Link></span>
                <ul>
                    <li><Link href="/"><a>탐색하기</a></Link></li>
                    {loginState ? <LOG onClick={() => createBtn()}><Link href="/item/additem"><a>발행하기</a></Link></LOG> : <LOG onClick={() => createBtn()}>발행하기</LOG>}
                    {loginState ? <LOG><Link href="/user/mynftall"><a>나의NFT</a></Link></LOG> : <LOG></LOG>}
                    {loginState ? <LOG onClick={() => { logout() }}>LogOut</LOG> : <LOG onClick={() => { login() }}>Login</LOG>}
                </ul>
            </MenubarWrapper>

        </>
    )
}

export default MenuBar


const MenubarWrapper = Styled.div`
    box-sizing:border-box;
    height:90px;
    padding: 1.4% 0;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items: stretch;
    border-bottom:2px solid rgba(20,30,40,.08);
    font-size:16px;
    font-weight:550;
    line-height:30px;

    & > div {
        width : 1300px;
        height : auto;
    }

    span{
        margin-right:400px;
    }
    ul li {
        list-style:none;
        float:left;
    }
    ul>li, a{
        margin-right:20px;
        color:rgba(0,0,0,.5);
        background: #fafafa;

    }
    ul>li:hover, a:hover{
        color:#343a40;
    }
    ul a:hover{
        color:#1e73fa;
        border-bottom: 4px solid #1e73fa;
        padding-bottom:31px;
    }
    ul>li:nth-child(4){
        width:60px;
        text-align:center;
        padding:13px;
        padding-top:7px;
        margin-bottom:3px;
        line-height:15px;
        border:1px solid #007bff;
        background-color:#007bff;
        border-radius:5%;
        color:#fff;
        margin-left:15px;
    }
    ul>li:nth-child(4):hover{
        background-color:#1e73fa;
    }
    a{
        text-decoration:none;
    }

    @media screen and (max-width : 1095px) {
    box-sizing:border-box;
    height:90px;
    padding: 1.4% 0;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items: stretch;
    border-bottom:2px solid rgba(20,30,40,.08);
    font-size:30px;
    font-weight:550;
    line-height:50px;

    & > div {
        width : 1300px;
        height : auto;
    }

    span{
        width: 200px;
        margin-right:400px;
    }
    ul li {
        display:none;
        list-style:none;
        float:left;
    }
    ul>li, a{
        margin-right:20px;
        color:rgba(0,0,0,.5);
        background: #fafafa;

    }
    ul>li:hover, a:hover{
        color:#343a40;
    }
    ul a:hover{
        color:#1e73fa;
        border-bottom: 4px solid #1e73fa;
        padding-bottom:31px;
    }
    ul>li:nth-child(4){
        width:60px;
        text-align:center;
        padding:13px;
        padding-top:7px;
        margin-bottom:3px;
        line-height:15px;
        border:1px solid #007bff;
        background-color:#007bff;
        border-radius:5%;
        color:#fff;
        margin-left:15px;
    }
    ul>li:nth-child(4):hover{
        background-color:#1e73fa;
    }
    a{
        text-decoration:none;
    }
}
`
const LOG = Styled.li`
    cursor:pointer;
`