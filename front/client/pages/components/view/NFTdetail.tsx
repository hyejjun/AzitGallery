// view 페이지에서 NFT 설명 넣는 곳
import React, { useState } from "react";
import Styled from 'styled-components'
import Order from "./Order";
import NFTexplanation from "./NFTexplanation";
import Like from "../common/Like";

const NFTdetail = () => {
    const [like, setLike] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const doLike = () => {
        setLike(prev => !prev)
    }

    const orderOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            <NFTdetailWrap>
                <NFTBuy>
                    <Like doLike={doLike} like={like}/>
                    <span className="buyBtn" onClick={orderOpen}>
                        <button>구매하기</button>
                    </span>
                    <Order open={open} orderOpen={orderOpen} />
                </NFTBuy>

                <NFTexplanation/>
                
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
    padding-left: 65%;
    box-sizing: border-box;

    & > .buyBtn{
        width: 60%;
        margin-left: 3%;
    }

    & > .buyBtn > button {
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

