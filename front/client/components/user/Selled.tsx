import Styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Alert from '@mui/material/Alert';
import Waybill from '../view/Waybill';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryInfo_REQUEST } from '../../reducers/ship';
import { RootState } from '../../reducers';

const Selled = () => {

    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string
    }
    // @ 나중에 가라데이터 지우고 back 에서 가져옴

    const soldnftList = useSelector((state:RootState)=>state.list.soldnftList)
    const code = useSelector((state:RootState)=>state.ship)



    // @ 배송등록하기
    const dispatch = useDispatch()

    const [deliveryForm, setDeliveryForm] = useState<boolean>(false)
    const [itemcode,setItemCode] = useState<string>('')

    const setDelivery = (e) => {
        setDeliveryForm(prev => !prev)
        //setItemCode(e.target.id)
        if(selectDeliveryCompany && deliveryNum !== ''){
            dispatch(deliveryInfo_REQUEST(deliveryInfo))
        }
        setDeliveryCompany('')
        setDeliveryNum('')
        setItemCode('')
        alert('송장입력이 완료되었습니다.')
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
    const setopenship = (e) => {
        code.itemcode = e.target.id
        code.itemimg = e.target.className
        setDeliveryForm(prev => !prev)
    }

    // @ 나중에 item id 도 보내줘야함
    const deliveryInfo = {
        selectDeliveryCompany,
        deliveryNum,
        itemcode:code.itemcode
    }



    const compeltedList: JSX.Element[] = soldnftList.map((ele) =>
        <React.Fragment key={ele.id}>
            <NFTFourList>
                {/* <Alert severity="success" onClick={setDelivery}>배송 등록 완료!</Alert> */}
                {
                    ele.final_order_state=='배송준비중'
                    ? ele.item_delivery_state=='배송준비중'
                        ?
                        <Alert severity="error" >
                            <a id={ele.item_code} className={ele.main_img_link} onClick={(e)=>{setopenship(e)}}>송장등록필요!</a>
                        </Alert>
                        :
                        <Alert severity="success">
                        <a>송장등록완료!</a>
                        </Alert>
                    :
                    <Alert severity="success">송장등록완료</Alert>
                }
                <NFT>
                    <NFTImg>
                        <div><img src={ele.main_img_link}/></div>
                    </NFTImg>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>{ele.title}/{ele.color}/{ele.size}</NFTSubject>
                            <NFTartist>{ele.nick_name}</NFTartist>
                        </NFTOneList>
                        
                    </NFTOne>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>$ {ele.price}</NFTSubject>
                        </NFTOneList>
                        <NFTDeclaration>
                            <NFTSubject>
                            {
                                ele.final_order_state=='배송준비중'
                                ? ele.item_delivery_state=='배송준비중'
                                    ? '송장준비중'
                                    : '송장등록완료'
                                    
                                :'송장등록완료'
                            }
                            </NFTSubject>
                        </NFTDeclaration>
                    </NFTOne>
                </NFT>
            </NFTFourList>
        </React.Fragment>
    );

    return (
        <>
        <div>송장을 등록해주세요.</div>
            {
                deliveryForm
                    ? <Waybill img={code.itemimg} setClose={setDelivery} deliveryCompnay={deliveryCompnay} deliveryNum={deliveryNum} onChangeDeliveryNum={onChangeDeliveryNum} />
                    : <></>
            }

            
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
    border: 2px solid #e8e8e9;
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
    div > img {
        width:200px;
        height:200px;
        cursor:pointer;
    }
    
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
    width:100px;
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
