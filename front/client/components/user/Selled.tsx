import Styled from 'styled-components'
import React, { useState } from 'react'
import Link from 'next/link'
import Alert from '@mui/material/Alert';
import Waybill from '../view/Waybill';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { deliveryInfo_REQUEST } from '../../reducers/ship';

const Selled = () => {

    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string
    }
    // @ 나중에 가라데이터 지우고 back 에서 가져옴

    // @ 배송 등록 전, 판매된 NFT 리스트들
    const [Arr, setArr] = React.useState<ArrEle[]>([
        {
            id: 1,
            subject: 'ffffffffff',
            artist: 'daminal',
            Like: 0,
            alert: '신고하기'
        },
        {
            id: 2,
            subject: 'asdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기'
        },
        {
            id: 3,
            subject: 'asdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기'
        },

    ]);

    // @ 배송 등록 후, 판매된 NFT 리스트들
    const [Arr2, setArr2] = React.useState<ArrEle[]>([
        {
            id: 1,
            subject: 'ffffffffff',
            artist: 'daminal',
            Like: 0,
            alert: '신고하기'
        },
        {
            id: 2,
            subject: 'asdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기'
        },
        {
            id: 3,
            subject: 'gahhfdsh',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기'
        },
        {
            id: 4,
            subject: 'gahhfdsh',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기'
        },
    ]);

    // @ 배송등록하기
    const dispatch = useDispatch()

    const [deliveryForm, setDeliveryForm] = useState<boolean>(false)

    const setDelivery = () => {
        setDeliveryForm(prev => !prev)

        if(selectDeliveryCompany && deliveryNum !== ''){
            dispatch(deliveryInfo_REQUEST(deliveryInfo))
        }
        setDeliveryCompany('')
        setDeliveryNum('')
    }

    // @ 배송 관련 정보들
    const [selectDeliveryCompany, setDeliveryCompany] = useState<string>('')
    const deliveryCompnay = (e) => {
        setDeliveryCompany(e.target.value)
    }
    const [deliveryNum, setDeliveryNum] = useState<string>('')
    const onChangeDeliveryNum = (e) => {
        setDeliveryNum(e.target.value)
    }

    // @ 나중에 item id 도 보내줘야함
    const deliveryInfo = {
        selectDeliveryCompany,
        deliveryNum
    }

    const nameList: JSX.Element[] = Arr.map((ele) =>
        <NFTFourList>
            <Alert severity="error">
                <a className="deliverySet" onClick={setDelivery}>배송 등록 하기!</a>
            </Alert>
            <NFT>
                <NFTImg>
                    <div><img /></div>
                </NFTImg>
                <Line></Line>
                <NFTOne>
                    <NFTOneList>
                        <NFTSubject>{ele.subject}</NFTSubject>
                        <NFTartist>{ele.artist}</NFTartist>
                    </NFTOneList>
                    <NFTOneImg>
                        <img></img>
                    </NFTOneImg>
                </NFTOne>
                <NFTOne>
                    <NFTOneList>
                        <NFTSubject>@ {ele.Like}</NFTSubject>
                    </NFTOneList>
                    <NFTDeclaration>
                        <NFTSubject>* * *</NFTSubject>
                    </NFTDeclaration>
                </NFTOne>
            </NFT>
        </NFTFourList>
    );

    const compeltedList: JSX.Element[] = Arr2.map((ele) =>
        <NFTFourList>
            <Alert severity="success">배송 등록 완료!</Alert>
            <NFT>
                <NFTImg>
                    <div><img /></div>
                </NFTImg>
                <Line></Line>
                <NFTOne>
                    <NFTOneList>
                        <NFTSubject>{ele.subject}</NFTSubject>
                        <NFTartist>{ele.artist}</NFTartist>
                    </NFTOneList>
                    <NFTOneImg>
                        <img></img>
                    </NFTOneImg>
                </NFTOne>
                <NFTOne>
                    <NFTOneList>
                        <NFTSubject>@ {ele.Like}</NFTSubject>
                    </NFTOneList>
                    <NFTDeclaration>
                        <NFTSubject>* * *</NFTSubject>
                    </NFTDeclaration>
                </NFTOne>
            </NFT>
        </NFTFourList>
    );

    return (
        <>
            {
                deliveryForm
                    ? <Waybill setClose={setDelivery} deliveryCompnay={deliveryCompnay} deliveryNum={deliveryNum} onChangeDeliveryNum={onChangeDeliveryNum} />
                    : <></>
            }

            <NonCompleted>{nameList}</NonCompleted>
            <div>{compeltedList}</div>
        </>
    )
}

export default Selled


const NonCompleted = Styled.div`
    float: left;
`


const NFTFourList = Styled.ul`
    display:inline-block;
    list-style:none;
    margin-right:18px;
    margin-left:11px;

    .deliverySet{
        text-decoration: underline;
        background: #f4f491;
        cursor : pointer;
    }

    .MuiPaper-root{
        cursor : default;
    }
    
`
const NFT = Styled.li`
    border: 1px solid #bbb;
    border-radius:7px;
    height:360px;
    width:243px;
    box-sizing:border-box;
    padding:19px;
    margin-bottom:20px;
    box-shadow:3px 3px 10px #bbb;
`
const NFTImg = Styled.div`
    background:#bbb;
    width:200px;
    height:200px;
    cursor:pointer;
    
`

const NFTOne = Styled.ul`
    padding:0px;
    clear:both;
`

const NFTOneList = Styled.li`
    display:inline-block;
    list-style:none;
    float:left;
    margin-top:18px;

`
const NFTOneImg = Styled.li`
    display:inline-block;
    list-style:none;
    float:right;
    margin-top:18px;
    background:#bbb;
    width:35px;
    height:35px;

`

const NFTDeclaration = Styled.li`
    display:inline-block;
    list-style:none;
    float:right;
    margin-top:22px;
    width:35px;
    height:35px;
    color:grey;
    font-weight:bold;
    margin-left:30px;


`
const NFTSubject = Styled.div`
    font-weight:bold;
`

const NFTartist = Styled.div`
     color:#bbb;

`
const Line = Styled.div`
    background:#bbb;
    margin-top:20px;
    height:1px;
`
