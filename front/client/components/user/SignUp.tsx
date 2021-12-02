// 메인 페이지에 있는 새 NFT 등록하기 배너

import Styled from 'styled-components'
import Link from 'next/link'
import React,{ useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import SucJoin from './SucJoin'
import { useSelector, useDispatch } from 'react-redux'
import { SignUp_REQUEST } from "../../reducers/user"
import { Nickname_REQUEST } from "../../reducers/user"
import { Userlist_REQUEST } from "../../reducers/user"
import { Email_REQUEST } from "../../reducers/user"
import { setUncaughtExceptionCaptureCallback } from 'process'
import Router from 'next/router'
import { RootState } from "../../reducers"
import { truncate } from 'fs'
import { url } from '../../saga/url'
import axios from 'axios'

const SignUp = () => {
    const dispatch = useDispatch()
    const [nickName, setNickName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [nickErr, setNickErr] = useState<boolean>(true); 
    const [nickLength3Err, setNickLength3Err] = useState<boolean>(false); 
    const [nickSignErr, setNickSignErr] = useState<boolean>(false); 
    const [nickOverlapErr, setnickOverlapErr] = useState<boolean>(false); 

    const [emailErr, setEmailErr] = useState<boolean>(true); 
    const [email2Err, setEmail2Err] = useState<boolean>(true)
    const [emailOverlap, setEmailOverlap] = useState<boolean>(true)

    const [checked1,setChecked1] = useState<boolean>(false);
    const [checked2,setChecked2] = useState<boolean>(false);
    const [checked3,setChecked3] = useState<boolean>(false);

    // const [loading, setLoading] = useState<string>("");

    const User = useSelector((state:RootState) => state.user);

    useEffect(()=>{
        if(User.emailBool){
            setEmailOverlap(true);
        }else{
            setEmailOverlap(false);
        }
    },[User.emailBool])
    
    const nickChk1 = async e => {
        const value = e.target.value;
        setNickName(value);
        setNickErr(value === "");
        setNickLength3Err(value.length < 3 && value.length >0 || value.length > 20 );
        // setNickLength5Err(value.length < 5 && value.length >0);


        let result = await axios.post(`${url}/user/nicknamechk`,JSON.stringify(value))

        if(result.data == true){
            setnickOverlapErr(false)
        }else{
            setnickOverlapErr(true)
        }
        
        
        const chkk = () => {
        let chk = [",","?","=","`","~","!","@","#","$","%","^","&","*","(",")","<",">","/","*"]
        let chkTrue = 0;
        for( let i=0;i< chk.length;i++){
            if(value.indexOf(chk[i]) != -1) {
                chkTrue=1;
            }
        }
        if(chkTrue !==0){
            return true;
        }
        }
        setNickSignErr(chkk() === true)
    }   

    const change2 = e => {
        const value = e.target.value;
        
        dispatch(Email_REQUEST(value));
        setEmail(value);
        setEmailErr(value === "");

        let result = User.emailBool;
        if(result){
            setEmailOverlap(true) //이메일 가입 가능
        }else{
            setEmailOverlap(false) //이메일 중복
        }
    }

    const checkEmail = (e) => {
        var regExp = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmail2Err(regExp.test(e.target.value));
    }
    
    const handleChecked1 = e => {
        setChecked1(!checked1);
}
    
    const handleChecked2 = e => {
        setChecked2(!checked2);
        
    }
    const handleChecked3 = e => {
        setChecked3(!checked3);
    }

    

    const [joinState,setJoinState] = useState<boolean>(false)
    const sucJoin = async () => {
           
        if(nickErr === true || 
            nickLength3Err === true || 
            nickSignErr === true ||
            emailErr === true ||
            email2Err !== true ||
            nickOverlapErr === true            
            ){
            alert("내용을 확인해주세요.")
            return ;
        }else if(checked1 !== true || 
            checked2 !== true || 
            checked3 !== true){
            alert("필수 동의사항에 체크해주세요.")

            return;
        }else{
            setJoinState(prev=>!prev)        
        }
        if(checked1 !== true || checked2 !== true || checked3 !== true){
            alert("필수 동의사항에 체크해주세요.")
        }
        
       
        let data = {
            NickName:nickName,
            Address:User.UserAddress,
            Email:email,
            
        }
        dispatch(SignUp_REQUEST(data))
        dispatch(Userlist_REQUEST())

    }


    return (
        <>
        {joinState?<SucJoin/>:<></>}
            <Css>
                <div className="layout">
                    <div className="signUpContainer">
                        <form>
                            <div className="title">회원가입</div>
                           

                            <table className="marginTop width100">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table className="width100">
                                                <tbody>
                                                    <tr>
                                                        <td className="textLeft pageSubtitleBold">닉네임</td>
                                                        <td className="sideSubtitle">* 5~20자의 한글, 영문 대소문자, 숫자, 특수기호(_),(-),(.)만 사용 가능합니다.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="height10"></td>
                                    </tr>
                                    <tr>
                                        <td className="textLeft">
                                            <input type="text" className="InputBox" value={nickName} onChange={nickChk1} name="nickName" id="nickName" placeholder="닉네임을 입력해주세요."/> 
                                            { nickErr ? <div className="error">닉네임을 입력해주세요.</div> 
                                            : <> { nickLength3Err ? <div className="error">닉네임을 3자 이상, 20글자 이하로 입력해주세요.</div> 
                                            : <> { nickSignErr ? <div className="error">닉네임은 한글, 영문 대소문자, 숫자, 특수기호(_),(-),(.)만 입력 가능합니다.</div> 
                                            : <> { nickOverlapErr ? <div className="error">사용중인 닉네임입니다.</div> : <div className="success">사용 가능한 닉네임입니다.</div>}</>}</>}</>}
                                                                                      
                                           
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="height42"></td>
                                    </tr>
                                    <tr>
                                        <td className="textLeft pageSubtitleBold">지갑 주소</td>
                                    </tr>
                                    <tr>
                                        <td className="height10"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" className="InputBox" readOnly value={User.UserAddress} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="height42"></td>
                                    </tr>
                                    <tr>
                                        <td className="textLeft pageSubtitleBold">이메일 주소</td>
                                    </tr>
                                    <tr>
                                        <td className="height10"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="email" className="InputBox" value={email} onChange={change2} onBlur={checkEmail} name="email" placeholder="이메일 주소를 입력해주세요." />
                                            { emailErr ? <div className="error">이메일 주소를 입력해주세요.</div> 
                                            : <>  { email2Err ? <></>  : <div className="error">유효한 이메일 주소가 아닙니다. 이메일 주소를 다시 확인해주세요.</div>}</>}
                                            { emailOverlap ? <></> : <div className="error">이미 가입된 이메일 주소입니다. 이메일 주소를 다시 확인해주세요.</div>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="height42"></td>
                                    </tr>
                                    <tr> 
                                        <td>
                                            <div>
                                                <div className="mBottom">
                                                    <label className="chkFont"><input type="checkbox" checked={checked1} onChange={handleChecked1} id="agree1" /> 만 19세 이상입니다.</label>
                                                    { checked1 ? <> </> : <div className="error">AzitGallery는 만 19세 이상만 이용 가능합니다.</div>} 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>
                                                <div className="mBottom">
                                                    <label className="chkFont"><input type="checkbox" checked={checked2} onChange={handleChecked2} id="agree2" /> (필수) <a target="_blank" href="http://naver.com" rel="noreferrer" className="underLine"> 서비스 이용약관</a>에 동의합니다.</label>
                                                    { checked2 ? <> </> : <div className="error">필수 항목에 동의해주세요.</div>} 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div>
                                                <div className="mBottom">
                                                    <label className="chkFont"><input type="checkbox" checked={checked3} onChange={handleChecked3} id="agree3" /> (필수) <a target="_blank" href="http://naver.com" rel="noreferrer" className="underLine">개인정보 수집 및 이용</a>에 동의합니다.</label>
                                                    { checked3 ? <> </> : <div className="error">필수 항목에 동의해주세요.</div>} 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="devider"></div>
                            <div className="btn3">
                                <a className="cancelBtn" onClick={()=>Router.back()}>취소</a>
                                <button type="button" className="signUpBtn Btn" onClick={sucJoin}>회원가입</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </Css>

        </>
    )
}

export default SignUp

const Css = Styled.div`

.layout{

}
    
.marginTop{
    margin-top:66px;
}

.signUpContainer{
    width: 560px;
    height: 100%;
    padding: 80px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgb(0 0 0 / 8%);
    border-radius: 16px;
    position: relative;
    margin:0 auto;
}

.title{
    display: table-cell;
    font-size: 36px;
    font-weight: 700;
    line-height: 48px;
    color: #2d3741;
    vertical-align: bottom;
}

.textLeft{
    text-align: left!important;
}

.pageSubtitleBold{
    display: table-cell;
    font-weight: 700;
    font-size: 20px;
    color: #2d3741;
    vertical-align: middle;
}

.sideSubtitle{
    font-size: 12px;
    line-height: 20px;
    color: rgba(45,55,65,.7);
    text-align: right;
}

.InputBox{
    display: block;
    width: 100%;
    height: calc(1.75em + 1.25rem + 2px);
    padding: .625rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.75;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-sizing: border-box;
}

.chkFont{
    font-size: 16px;
    line-height: 28px;
    color: #2d3741;
}

.mBottom{
    margin-bottom:1.2rem;
}

.devider{
    padding-bottom: 48px;
    margin-bottom: 48px;
    border-bottom: 1px solid rgba(20,30,40,.08);
}
.btn3{
    float:right;
}
.Btn{
    display: inline-block;
    border-width: 0;
    padding: 18px 24px;
    height: 64px;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 18px 24px;
    font-size: 1rem;
    line-height: 1.75;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-sizing:border-box;
}

.btnBlur{
    background-color: #9597981f;
    color: #2d3741;
    
}

.signUpBtn{
    color: #fff;
    background-color: #2d3741;
    border-color: #2d3741; 
    font-weight:bold;
    cursor : pointer;

}

.cancelBtn{
    display: inline-block;
    padding: 18px 24px;
    margin: 0 auto;
    text-align:center;
    border-radius: .25rem;
    font-weight:bold;
    font-size: 1rem;
    margin-right: 8px;
    color: #2d3741;
    background-color: #9597981f;
    height:29px;
    cursor : pointer;

} 

.displayNone{
    display:none;
}
.underLine{
    color:#2d3741;
}

svg{
    overflow:hidden;
    margin-top:40px;
    border: 1px dashed #141E28;
    border-radius: 100%;
}
svg:hover{
    background: #141E28;
}


.textCenter{
    text-align:center!important;
}

.image1{
    width: 120px;
    height: 120px;
    margin-left: auto;
    margin-right: auto;
}

.image2{
    height: 150px;
}

.image4{
    -webkit-flex-basis: 0;
    flex-basis: 0;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    max-width: 100%;
}

.imageUp{
    width: 100%;
    display:none;
}

.error{
    color:#dc3545;
    font-size:12px;
    margin-top: 4px;
}
.success{
    color:#000;
    font-size:12px;
    margin-top: 4px;
}

.height42{
    height:42px;
}

.height10{
    height:10px;
}

.width100{
    width:100%;
}


`