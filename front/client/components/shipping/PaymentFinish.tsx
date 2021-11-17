import Styled from 'styled-components'
import React, { useState } from 'react'
import Link from 'next/link';
import DeliveryImg from './DeliveryImg';
import DeliveryForm from './DeliveryForm';
import OrderInfo from './OrderInfo'
import DeliveryInfo from './DeliveryInfo';
import ProductInfo from './ProductInfo';
import Btn from '../common/Btn';

const PaymentFinish = () => {
    return (
        <>
             {/* <ShipWrap>
            </ShipWrap>  */}
            {/* <ShipWrap> */}
            <ShipWrap>
                <DeliveryImg/>
                <br/><br/><br/><br/>
                <OrderInfo/>
                <br/>
                <DeliveryInfo/>
                <br/>
                <ProductInfo/>

            </ShipWrap>
                {/* <DeliveryForm/> */}
            <Link href="/"><a><Btn>메인으로</Btn></a></Link>
            {/* </ShipWrap> */}
        </>
    )
}

export default PaymentFinish

const ShipWrap = Styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    margin:60px 0px 40px 60px;
`
const Center = Styled.div`
    width: 160px;
    display:flex;
    margin: 10px 0px 50px 60px;   
`
const SubmitBtn = Styled.button`
    width: 160px;
    height:50px;
    color:grey;
    font-size:18px;
    display:inline-block;
    cursor:pointer;
    &:hover{
        color:black;
    }
`