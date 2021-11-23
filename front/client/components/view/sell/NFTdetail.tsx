import React, { useState,useEffect } from "react";
import Styled from 'styled-components'
import Order from "./Order";
import NFTexplanation from "../NFTexplanation";
import Like from "../../common/Like";
import NFTTitle from "../NFTTitle";
import SizeSelect from "../SizeSelect";
import ColorSelect from "../ColorSelect";
import { RootState } from "../../../reducers";
import {useRouter} from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { directDealView_REQUEST } from '../../../reducers/view'



const NFTdetail = ({children}) => {

    const [colorpic,setColor] = useState<string>('')
    const [sizepic,setSize] = useState<string>('')

    const router = useRouter()
    const {view} = router.query // 카테고리 이름
    console.log(view);
    
    
    const dispatch = useDispatch()
    let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")
    
    useEffect(()=>{
        dispatch(directDealView_REQUEST(params))
    },[])

    
    const [open, setOpen] = useState<boolean>(false);
    const orderOpen = () => {
        setOpen(prev => !prev)
    }

    const nickname = useSelector((state:RootState) => state.view.nick_name);
    const title = useSelector((state:RootState) => state.view.title);
    const description = useSelector((state:RootState) => state.view.description);
    const color = useSelector((state:RootState) => state.view.color);
    const size = useSelector((state:RootState) => state.view.size);
    const price = useSelector((state:RootState) => state.view.price);
    const currency = useSelector((state:RootState) => state.view.currency);
    const item_img_link = useSelector((state:RootState) => state.view.item_img_link);

    const colorArr = color.split(",")
    const sizeArr = size.split(",")

    
    console.log(colorpic)
    console.log(sizepic)
    return (
        <>
            <NFTdetailWrap>
                <NFTBuy>
                    <ColorSelect colorArr={colorArr} flagsetcolor={setColor} flagcolor={colorpic}/>
                    <SizeSelect sizeArr={sizeArr} flagsetsize={setSize} flagsize={sizepic}/>
                    <Like/>
                    <BuyBtnCSS onClick={orderOpen}>
                        <button>{children}</button>
                    </BuyBtnCSS>
                    <Order open={open} orderOpen={orderOpen} price={price} currency={currency} flagcolor={colorpic} flagsize={sizepic} item_id={params}/>
                </NFTBuy>
                <NFTTitle title={title}/>
                <NFTexplanation nickname={nickname} description={description}/>
            </NFTdetailWrap>
        </>
    )
}
export default NFTdetail

const NFTdetailWrap = Styled.div`
    width : 100%;
    height : auto;
    margin-top: 5%;
`

const NFTBuy = Styled.div`
    
    width: 100%;
    height: 60px;
    display: flex;
    padding-left: 50%;
    box-sizing: border-box;

`

export const BuyBtnCSS = Styled.span`
    width: 246px;
    height : 60px;
    margin-left: 3%;
    
    & > button {
        width : 100%;
        height : 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        padding: 12px 20px;
        background-color: rgb(32, 129, 226);
        border: 1px solid rgb(32, 129, 226);
        color: rgb(255, 255, 255);
        cursor: pointer;
    }

` 
export const EndBtnCSS = Styled.span`
    width: 246px;
    height : 60px;
    margin-left: 3%;
    
    & > button {
        width : 100%;
        height : 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        padding: 12px 20px;
        background-color: #bbb;
        border: 1px solid white;
        color: white;
        cursor: pointer;
    }

` 