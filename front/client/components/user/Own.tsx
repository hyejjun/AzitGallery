import Styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from "../../reducers"
import { ListState } from "../../reducers/list"
import Alert from '@mui/material/Alert';
import { ClickAwayListener } from '@mui/material'
import ModalBackground from '../common/ModalBackground'
import ModalForm from '../common/ModalForm'
import {Update_ship_state_REQUEST} from '../../reducers/user'
import { loadDefaultErrorComponents } from 'next/dist/server/load-components'

const Own = () => {

    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string,
    }

    const [itemcode,setItemCode] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const [chDelivery,setchDelivery] = useState<boolean>(false)
    const mynftList =  useSelector((state:RootState)=>state.list.mynftList);
    const check = useSelector((state:RootState)=>state.user.check)

    const dispatch = useDispatch()
    

    
    const chDeliveryBtn = (e) => {
        setTitle(e.target.id)
        setItemCode(e.target.className)
        setchDelivery(true)
    }
    const insertshipinfoBtn = (e) => {
        let linkdata = e.target.className.split('-')[1]
        window.location.href=`/ship/a${linkdata}`
    }

    const showNftBtn = (e) => {
        console.log(e.target.className,'==========================')
        window.open(`https://baobab.scope.klaytn.com/account/${e.target.className}?tabId=txList`)
    }

    const nameList: JSX.Element[] = mynftList.map((ele) =>
        <React.Fragment key={ele.id}>
            <NFTFourList>
                {   ele.sell_type==0
                    ?
                        ele.final_order_state=='배송준비중'
                        ? 
                            ele.delivery_state=='배송준비중'
                            ?
                            <Alert severity="error">
                            <a className={`${ele.item_code}`} id={`${ele.title}/${ele.size}/${ele.color}`} onClick={(e)=>{chDeliveryBtn(e)}} >배송 완료 요청</a>
                            </Alert>
                            :
                            <Alert severity="success"><a className={ele.nft} onClick={(e)=>{showNftBtn(e)}}>NFT확인!</a></Alert>
                        :
                        <Alert severity="success"><a className={ele.nft} onClick={(e)=>{showNftBtn(e)}}>NFT확인!</a></Alert>
                        
                    :  
                        ele.final_order_state=='배송정보필요'
                        
                        ? 
                             <Alert severity="error">
                                 <a className={ele.item_code} id={`${ele.title}/${ele.size}/${ele.color}`} onClick={(e)=>{insertshipinfoBtn(e)}}>배송정보입력!</a>
                             </Alert>
                        : 
                            ele.delivery_state=='배송준비중'
                            ?
                            <Alert severity="error">
                                <a className={`${ele.item_code}`} id={`${ele.title}/${ele.size}/${ele.color}`} onClick={(e)=>{chDeliveryBtn(e)}} >배송 완료 요청</a>
                            </Alert>
                            :
                            <Alert severity="success"><a className={ele.nft} onClick={(e)=>{showNftBtn(e)}}>NFT확인!</a></Alert>

                        
                }
                <NFT>
                    <NFTImg>
                        {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                        <div><img src={ele.main_img_link}/></div>
                    </NFTImg>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>{ele.sell_type==1?'경매 | ':''}{ele.title} | {ele.color} | {ele.size}</NFTSubject>
                            {/* 여기 a 빠졌는데 동작되는 이유.. a 추가하면 오류남 */}
                            <NFTartist>{ele.nick_name}</NFTartist>
                        </NFTOneList>
                        {/* <NFTOneImg>
                            <img></img>
                        </NFTOneImg> */}
                    </NFTOne>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>$ {ele.price}</NFTSubject>
                        </NFTOneList>
                        <NFTDeclaration>
                            <NFTSubject>
                                {
                                    ele.sell_type==0
                                    ?
                                        ele.final_order_state=='배송준비중'
                                        ? 
                                            ele.delivery_state=='배송준비중'
                                            ? 
                                                'nft발행요청'
                                            : 
                                                'nft발행요청'
                                        :
                                            'nft발행완료'
                                    : 
                                        ele.final_order_state=='배송정보필요'
                                            ? 
                                                ele.delivery_state=='배송준비중'
                                                ?
                                                    'nft발행요청'
                                                :   
                                                    'nft발행요청'
                                            :
                                                ele.final_order_state=='배송완료'
                                                ?
                                                    'nft발행완료'
                                                :
                                                    'nft발행요청'
                                        
                                }
                            </NFTSubject>
                        </NFTDeclaration>
                    </NFTOne>
                </NFT>  
            </NFTFourList>
        </React.Fragment>
    );

    const closeDelvery = () => {
        setchDelivery(false)
    } 
    const deliverySuc = () => {
        dispatch(Update_ship_state_REQUEST(itemcode))
        setchDelivery(false)
        alertClick()
    }
    const alertClick = () => {
        alert('nft 발행 요청이 접수되었습니다.')
        window.location.href='/user/mynftall'
    }

    return (
        <>
        <div>배송이 완료된 경우 nft 발행을 요청하세요.</div>
        {
        chDelivery
        ?
        <ModalBackground>
            <ModalForm >
                <DeliverCh>
                <div>
                    <p>{title}</p>
                    
                    <span><button onClick={deliverySuc}>nft발행요청</button></span>
                    <span><button onClick={closeDelvery}>배송창닫기</button></span>
                    
                </div>
                </DeliverCh>
            </ModalForm>
        </ModalBackground>
        :
        <>
        </>
        
        }

            <div>{nameList}</div>
        </>
    )
}

export default Own



const NFTFourList = Styled.ul`
    display:inline-block;
    list-style:none;
    margin-right:18px;
    margin-left:11px;
    cursor : pointer;
    
    .delivered_req{
        background :#fdeded;
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
const DeliverCh = Styled.div`
    margin-top:30px;

    span {
        margin-right:20px;
        margin-top:10px
    }
    button {
        padding:10px;
        margin-top:10px
        width:200px;
        height:50px;
        background-color:#9597981f;
        color:#2d3741;
        font-weight:700;
        font-size:16px;
        border:none;
        border-radius:3%;  
    }
`