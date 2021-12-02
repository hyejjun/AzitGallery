import Styled from 'styled-components'
import React, { useEffect } from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SellerAdmin_REQUEST, SellerAdminWait_REQUEST, UserInfo_REQUEST } from '../../reducers/user'
import { RootState } from "../../reducers"
import { useSelector, useDispatch } from 'react-redux'
import { UserState } from "../../reducers/user"
import Button from '@mui/material/Button';


const UserInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const userEmail = useSelector((state: RootState) => state.user.Email);
    const UserAddress = useSelector((state: RootState) => state.user.UserAddress);
    const NickName = useSelector((state: RootState) => state.user.NickName);
    const adminApproval = useSelector((state: RootState) => state.user.adminApproval);
    const emailValidation = useSelector((state: RootState) => state.user.emailValidation);

    

    useEffect(() => {
        dispatch(UserInfo_REQUEST(user.UserAddress))
    }, [])



    const SellerAdmin = () => {
        alert('해당 이메일에서 인증해주세요')
        // dispatch(SellerAdminWait_REQUEST(user.UserAddress))

        let data = {
            userEmail,
            UserAddress,
            NickName
        }
        dispatch(SellerAdmin_REQUEST(data))

    }


    return (
        <UserWrapper>
            <div>
                <p>나의 프로필</p>
                <p><AccountCircleIcon /></p>
                <span>
                    <ul>
                        <li>
                            <p>닉네임</p>
                            <p>&nbsp;{/*nickname*/}{user.NickName}</p>
                        </li>
                        <li>
                            <p>지갑주소</p>
                            <p>&nbsp;{/*wallet account*/}{user.Address}</p>
                        </li>
                        <li>
                            <p>이메일</p>
                            <p>&nbsp;{/*email account*/}{user.Email}</p>
                        </li>
                        <li>
                            <p>
                                판매자 인증
                                {
                                    adminApproval == 3
                                        ? <span><VerifiedUserIcon />인증완료</span>
                                        : (adminApproval == 1
                                            ? <span>대기중</span>
                                            : (
                                                adminApproval == 2
                                                    ? <span className="rejected">반려됨</span>
                                                    : <span></span>
                                            )
                                        )
                                }
                            </p>
                        </li>
                        <li className="sellerReq" >
                            {
                                adminApproval !== undefined
                                ? <></>
                                : <Button variant="contained" className="sellerReqBtn" onClick={SellerAdmin}>판매 신청</Button>
                            }
                        </li>
                        {/* <li>
                            <button><Link href="/user/edit"><a>프로필편집</a></Link></button>
                            <button>회원탈퇴</button>
                        </li> */}
                    </ul>
                </span>
            </div>
        </UserWrapper>
    )
}

export default UserInfo

const UserWrapper = Styled.div`
    box-sizing:border-box;
    width:50%;
    height:60vh;
    margin-top:3%;
    margin:auto;
    border-radius:2%;
    display : block;
    a{
        text-decoration:none;
        font-weight:500;
    }
    div{
       width:100%;
       height:480px;
       padding-top:20px;
       align-items: stretch;
    }
    div>p:nth-child(1){
        font-size:35px;
        font-weight:700;
        color: rgba(45,55,65,.9);
        margin-bottom:30px;
    }
    div>p:nth-child(2){
        width:90px;
        height:90px;
        float:left;
        margin-top:8px;
        margin-right:120px;
        margin-bottom:200px;
        line-height:center;
    }
    div>p:nth-child(2)>svg{
        width:140px;
        height:140px;
        cursor: pointer;
        margin-left:15px;
    }
    li{
        margin-bottom:15px;
    }
    div>span>ul>li>p:nth-child(1){
        line-height:28px;
        font-weight: 600;
        font-size: 20px;
        color: #2d3741;
        vertical-align: middle;
        margin-bottom:7px;
    }
    div>span>ul>li>p:nth-child(1)>span{
        margin-left:10px;
        font-size:14px;
        font-weight:300x;
        color:blue;
    }
    div>span>ul>li>p:nth-child(1)>span>svg{
        color:blue;
        width:16x;
        height:16px;
    }
    div>span>ul>li>p:nth-child(2){
        font-size: 15px;
        line-height: 28px;
        color: #2d3741;
        border-spacing: 2px;
        font-weight: 360;
    }
    div>span>ul>li:nth-child(4){
        margin-top:40px;
        margin-left:30px;
    }

    div>span>ul>li:nth-child(4) a{
        //border:1px solid rgba(45,55,65,.9);
        padding:10px 15px 10px 15px;
        border-radius:5%;
        background-color:rgba(239, 239, 239,0.2);
    }
    div>span>ul>li:nth-child(5){
        margin-top:40px;
        float: right;
    }
    div>span>ul>li:nth-child(5)>button{
        box-sizing:border-box;
        /* border:1px solid #9597981f; */
        border-radius: .25rem;
        padding: 12px 24px;
        height: 50px;
        display: inline-block;
        margin-right:10px;
        font-weight: 800;
        text-align: center;
        vertical-align: middle;
        /* background-color: #9597981f; */
    }
    div>span>ul>li:nth-child(5)>button:nth-child(1) a{
        background-color: #9597981f;
        color: #2d3741;
        font-weight: 800;
    }
    div>span>ul>li:nth-child(5)>button:nth-child(1) :hover{
        opacity:0.8;
    }
    div>span>ul>li:nth-child(5)>button:nth-child(2) :hover{
        opacity:1;
    }
    div>span>ul>li:nth-child(5)>button:nth-child(2) {
        background-color:#2d3741;
        opacity:0.9;
        color: #9597981f;
    }

    div>span>ul>li:nth-child(4) {
        color:black;
        font-weight:bold;
    }

    div>span>ul>li>p:nth-child(1)>.rejected{
        color : red;
    }

    .sellerReq{
        /* margin-top: 50px;
        padding-left: 79%; */
    }

    .sellerReqBtn{
        background: #2d3741;
        font-family: 'IBMPlexSansKR-Regular';
    }

    .sellerReqBtn:hover {
        background-color:#2e3033b8;
        
    }

`