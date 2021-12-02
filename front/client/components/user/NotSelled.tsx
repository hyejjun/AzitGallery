import Styled from 'styled-components'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from "../../reducers"


const NotSelled = () => {

    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string
    }

    const notsellednftList = useSelector((state:RootState)=>state.list.notsellnftList)

    


    const nameList: JSX.Element[] = notsellednftList.map((ele) =>
        <React.Fragment key={ele.id}>
            <NFTFourList>
                <NFT>
                    <NFTImg>
                        <div><img src={ele.main_img_link}/></div>
                    </NFTImg>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>{ele.title}/{ele.color}/{ele.size}</NFTSubject>
                            <NFTartist>{ele.date}</NFTartist>
                        </NFTOneList>
                    </NFTOne>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>{ele.item_code}-{ele.id}</NFTSubject>
                        </NFTOneList>
                        <NFTDeclaration>
                            <NFTSubject></NFTSubject>
                        </NFTDeclaration>
                    </NFTOne>
                </NFT>
            </NFTFourList>
        </React.Fragment>
    );

    return (
        <>
            <div>{nameList}</div>
        </>
    )
}

export default NotSelled



const NFTFourList = Styled.ul`
    display:inline-block;
    list-style:none;
    margin-right:18px;
    margin-left:11px;
    
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
