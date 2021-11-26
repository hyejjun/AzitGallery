// 메인 페이지에 있는 새 NFT 등록하기 배너

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Styled from 'styled-components'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import RequireLogin from '../RequireLogin';
import LoginForm from '../common/login/LoginForm';
import { RootState } from '../../reducers';

const MyNFT = ()=>{
    const [loginState, setLoginState] = useState<boolean>(false)
    const [flag, setFlag] = useState<boolean>(false)
    const [Login, setLogin] = useState<boolean>(false)

    const User = useSelector((state: RootState) => state.user) 

    useEffect(() => {
        setLoginState(false)
        if (User.loginBool) {
            setLoginState(true)
        }else{
            setLoginState(false)
        }

    }, [User.loginBool])

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

                if (User.signupBool == false) {
                    window.location.href = "/signup"
                } else if (User.signupBool == true) {
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
    const onClick = () => {
        if (!window.klaytn) {
            return
        }
        setClicked(true)
        kaikasLogin()
    }
    return(
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
            <MyNFTAll>
                <Menu>
                    <MenuH3>나만의 NFT를 발행해보세요</MenuH3>
                    <div>KrafterSpace에서는 누구나 쉽고 간편하게<br/>NFT를 발행하고 관리할 수 있어요.</div>
                    { loginState ? <Link href = "/item/additem"><a><Button variant="contained" size="large">NFT 발행하기</Button></a></Link>
                    : <> <a><Button variant="contained" size="large" onClick={createBtn}>NFT 발행하기</Button></a> </> }
                        {/* <SellBtn>NFT 발행하기</SellBtn> */}
                    
                </Menu>
                {/* <MenuImg><img src = {require('../../src/지도.jpg')} /></MenuImg> */}
                <MenuImg> <img /> </MenuImg>
            </MyNFTAll>
            <Line></Line>
        </>
    )
}

export default MyNFT

const MyNFTAll = Styled.ul`
    height:480px;
    cursor : default;

    @media screen and (max-width : 1095px) {
        display:none;
}
    
`

const Menu = Styled.li`
    color:#2d3741;
    font-size:24px;
    display:inline-block;
    text-decoration:none;
    list-style:none;
    margin-right:20px;
    float:left;

    & > a {
        margin-top:100px;
        display : inline-block;
    }
    & > a > button {
        width : 200px;
        height : 50px;
        
    }

`

const MenuImg = Styled.li`
    color:#2d3741;
    font-size:24px;
    display:inline-block;
    text-decoration:none;
    list-style:none;
    margin-right:20px;
    float:right;
    background:#bbb;
    margin-top:60px;
    margin-right:50px;
    box-sizing:border-box;
    width:280px;
    height:300px;
`

const MenuH3 = Styled.h3`
    font-size:42px;
    margin-top:50px;
    margin-bottom:30px;
`
const SellBtn = Styled.button`
    margin-top:80px;
    background:#055fec;
    color:white;
    width:210px;
    height:70px;
    font-size:22px;
    border-radius:5px;
    cursor:pointer;
    &:hover{
        background:white;
        color:#055fec;
        border:1px solid #055fec;

    }
`

const Line = Styled.div`
    background:#bbb;
    margin-top:20px;
    height:1px;
    margin-bottom:50px;
    box-shadow:3px 3px 10px #bbb;
`
const LOG = Styled.li`
    cursor:pointer;
`
