import { ItemListCSS } from './ItemListCSS'
import { RootState } from "../../reducers"
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { main_all_direct_REQUEST } from '../../reducers/main'
import Category from './Category'

const ItemListAuction = (props) => {
    const {
        PictureNumberNotice,
        SelectBox,
        SelectOption,
        NFTComponent,
        NFTFourList,
        NFT,
        NFTImg,
        IMG,
        NFTOne,
        NFTOneList,
        NFTOneImg,
        NFTDeclaration,
        NFTSubject,
        NFTartist,
        Line,
        MoreNFT,
        AStyle,
    } = ItemListCSS

    const dispatch = useDispatch()
    const main = useSelector((state:RootState) => state.main);
    const nameList: any = main.mainitemList.map((ele)=>
        <React.Fragment key={ele.item_id}>
            <NFTFourList>
                <NFT>
                    <Link href = {`auction/${ele.item_id}`}>
                        <a>
                            <NFTImg>
                                <IMG src = {ele.main_img_link}/>
                            </NFTImg>
                        </a>
                    </Link>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                        <Link href = {`auction/${ele.item_id}`}><AStyle><NFTSubject>{ele.title}</NFTSubject></AStyle></Link>
                        <NFTartist>{ele.nick_name}</NFTartist>
                        </NFTOneList>
                        <NFTDeclaration>
                            <NFTSubject></NFTSubject>
                        </NFTDeclaration>
                    </NFTOne>

                </NFT>
            </NFTFourList>
        </React.Fragment>
    )
    return (
        <>
            <div>
                {/* <PictureNumberNotice>
                    전체 NFT 리스트 (총 count개 발행됨)
                </PictureNumberNotice> */}
            </div>
            <NFTComponent>
                <Category sell_type={props.sell_type} sendData ={props.sendData} setCategory={props.setCategory} setSubCategory={props.setSubCategory}/>
                <div>
                    <div>
                        <ul>
                            {nameList}
                        </ul>
                    </div>
                </div>
            </NFTComponent>
            <MoreNFT >더보기</MoreNFT>

        </>
    )
}

export default ItemListAuction