import React, { useState,useEffect } from "react";
import Styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import { KipToken_REQUEST } from "../../../reducers/mint";
import { direct_deal_REQUEST } from "../../../reducers/deal";
import {  useDispatch } from 'react-redux'


declare global {
    interface Window {
        klaytn: any;
        caver: any;
    }
}

const Order = (props) => {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState<boolean>(false);
    const checkAgreement = (checkedState) => {
        setChecked(checkedState)
    }
    const shipquery = 6
    const shipurl = `/ship/${shipquery}`
    const unCheckedClick = () => {
        alert('동의란을 확인해주세요')
    }

    const Klaytn = () => {
        alert('klaytn')
        window.caver.klay
        .sendTransaction({
          type: 'VALUE_TRANSFER',
          from: window.klaytn.selectedAddress,
          to: '0x325B6d2a7eE98a868ad576fD261f561E36F097B1',
          value: window.caver.utils.toPeb('1', 'KLAY'),
          gas: 8000000
        })
        .once('transactionHash', transactionHash => {
          console.log('txHash', transactionHash)
        })
        .once('receipt', receipt => {
          console.log('receipt', receipt)
        })
        .once('error', error => {
          console.log('error', error)
        })

        console.log(JSON.stringify(window.location.href).split('ell/')[1].replace("\"", ""))
        let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")
        window.location.href = `/ship/${params}`

    }
    let data 
    data = {
        color:props.flagcolor,
        size:props.flagsize,
        item_id:props.item_id,
        price:props.price,
        currency:props.currency
    }
    //dispatch(direct_deal_REQUEST(data))

    // const Purchase = (props) => {
    //     let data = {
    //         price:props
    //     }
    //     // dispatch(direct_deal_REQUEST(data))
    //     // dispatch(KipToken_REQUEST(props))
    //     alert('EPI로 거래되셨습니다!')
    //     console.log(JSON.stringify(window.location.href).split('ell/')[1].replace("\"", ""))
    //     let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")
    //     window.location.href = `/ship/${params}`
    // }
    let NEXT =()=>{
        // dispatch(direct_deal_REQUEST(data))
        let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")
        window.location.href = `/ship/${params}`
    }
    
    return (
        <>
            <ModalWrapper flag={props.open}>
                <OrderForm flag={props.open}>
                    <OrderTitle>
                        <span>즉시 판매</span>
                        <span onClick={props.orderOpen}> <CloseIcon /> </span>
                    </OrderTitle>
                    <OrderContent>
                        <div className="orderContentTitle">
                            <div>Item</div>
                            <div>Subtotal</div>
                        </div>
                        {/* <div className="orderContentImage">
                            <div>
                                <img alt="상품 작은 이미지" />
                            </div>
                            <div>
                                {props.price}{props.currency}
                            </div>
                        </div> */}
                        <div className="orderTotalPrice">
                            <div>Total</div>
                            <div>{props.price}{props.currency}</div>
                        </div>
                        <div className="orderAgreement">
                            <input type="checkbox" id="agreementBuy" onChange={e=>{checkAgreement(e.target.checked)}}/>
                            <label htmlFor="agreementBuy">
                                By checking this box, I agree to 회사명's <span>Tearms of Service</span>
                            </label>
                                <Payment onClick = {Klaytn}>
                                    klaytn으로 결제
                                </Payment>
                                {/* <Payment onClick = {Purchase(props.price)}>
                                    EPI(자체 토큰)으로 결제
                                </Payment> */}
                        </div>
                    </OrderContent>
                    <OrderBtn>
                        {
                            checked 
                            ? <button onClick = {NEXT}>Checkout</button>
                            : <button className="unChecked" onClick={unCheckedClick}>Checkout</button>

                        }
                    </OrderBtn>
                </OrderForm>
            </ModalWrapper>
        </>
    )
}

export default Order

export const ModalWrapper = Styled.div<{flag:boolean}>`
    box-sizing: border-box;
    display: ${(props) => (props.flag ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`

export const OrderForm = Styled.div<{flag:boolean}>`   
    width : 700px;
    height: 580px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:  ${props => (props.flag ? 'block' : 'none')};
    box-shadow: 0 4px 10px rgb(0 0 0 / 20%);
    position: relative;
    background-color: #fff;
    border-radius: 10px;
`

export const OrderTitle = Styled.div`
    width: 100%;
    height: 70px;
    display : flex;
    padding: 1.5% 1% 0 10%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(20,30,40,0.1);

    & > span:nth-child(1){
        width : 95%;
        text-align : center;
        font-size: 25px;
        font-weight: bold;
        line-height: 40px;
        cursor: default;
    }

    & > span:nth-child(2) > svg{
        width: 40px;
        font-size: 40px;
        cursor: pointer;
        float: right;
        color: #434343de;
    }
`

export const OrderContent = Styled.div`
    width: 100%;
    height: auto;
    padding: 5%;
    box-sizing: border-box;

    & > .orderContentTitle,
    & > .orderContentImage,
    & > .orderTotalPrice {
        width : 100%;
        display : flex;
        border-bottom: 1px solid rgba(20,30,40,0.1);
        padding : 2% 0 ;
        box-sizing: border-box;
    }

    & > .orderContentTitle > div:nth-child(1){
        width : 50%;
        font-size: 20px;
        font-weight: bold;
    }
    & > .orderContentTitle > div:nth-child(2){
        width: 50%;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
    }

    /********************************** */
    & > .orderContentImage > div:nth-child(1) {
        width : 50%;
        & > img {
            display : inline-block;
            width : 100px;
            height : 100px;
            background : #a9eb2f;
        }
    }

    & > .orderContentImage > div:nth-child(2) {
        width: 50%;
        text-align: right;
        padding: 6% 0;
        box-sizing: border-box;
    }

    /*************************************** */
    & > .orderTotalPrice > div:nth-child(1){
        width : 50%;
        font-size: 20px;
        font-weight: bold;
        
    }
    & > .orderTotalPrice > div:nth-child(2){
        width: 50%;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
        color: #007bff;
    }

    /*********************************** */
    .orderAgreement {
        height: auto;
        padding-top: 5%;
        box-sizing: border-box;
    }
    .orderAgreement > label {
        margin-left : 10px;
    }
    .orderAgreement > label > span {
        color : blue;
        
    }
`

export const OrderBtn = Styled.div`
    width : 100%;
    height: 120px;
    border-top: 1px solid rgba(20,30,40,0.1);
    padding: 5% 3%;
    box-sizing: border-box;

    & > a > button,
    & > button,
    .unChecked {
        width : 150px;
        padding: 12px 20px;
        background-color: rgb(32,129,226);
        border: 1px solid rgb(32,129,226);
        color: rgb(255,255,255);
        cursor: pointer;
        border-radius: 5px;
        float : right;
        font-size : 17px;
        font-weight : bold;
    }

    .unChecked {
        background-color : #d2d2d2;
        border: 1px solid #d2d2d2;
    }
`

const Payment = Styled.div`
    border:1px solid #bbb;
    width:200px;
    margin-top:10px;
`