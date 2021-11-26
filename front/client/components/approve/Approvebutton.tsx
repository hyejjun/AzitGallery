import Styled from 'styled-components'
import React, { useState } from 'react'
import { SellerAdminWait_REQUEST } from '../../reducers/user'
import { RootState } from "../../reducers"
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

const Approvebutton = () => {
    const dispatch = useDispatch()
    const User = useSelector((state:RootState) => state.user);
    const SellerAdmin = () => {
        dispatch(SellerAdminWait_REQUEST(User.UserAddress))
    }
    return (
        <>
            <Link href = "/user/user"><a><BUTTON onClick = {SellerAdmin}>이메일 인증 완료</BUTTON></a></Link>
        </>
    )
}

export default Approvebutton

const BUTTON = Styled.button`
    color:grey;
    border:1px solid grey;
    width:100px;
    height:80px;
    text-align:center;
    margin:30px 500px;
    font-size:20px;
`
