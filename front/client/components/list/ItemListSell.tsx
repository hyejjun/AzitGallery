import Styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Category from '../common/Category'
import { ItemListCSS } from './ItemListCSS'
import { Itemlist_REQUEST } from '../../reducers/list'
import { PlusItemlist_REQUEST } from '../../reducers/list'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../reducers"

const ItemListSell = (props) => {

    const {
        PictureNumberNotice,
        SelectBox,
        SelectOption,
        NFTComponent,
        NFTFourList,
        NFT,
        NFTImg,
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

    const { gender, List, handlegender, handleList } = props.CategoryState
    const dispatch = useDispatch()
    const list = useSelector((state:RootState) => state.list);
    let [loading, setLoading] = useState<boolean>(false)

    let [count,setCount] = useState<number>(0)
    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string,
        url: string
    }

    const [Arr, setArr] = React.useState<ArrEle[]>([
        {
            id: 1,
            subject: 'dsfa',
            artist: 'daminal',
            Like: 0,
            alert: '신고하기',
            url:`/sell/1`
        },
        {   id: 2,
            subject: 'adsfdsf',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/2`

        },
        {
            id: 3,
            subject: 'adsff',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/3`

        },
        {
            id: 4,
            subject: 'adsg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/4`

        },
        {
            id: 5,
            subject: 'adg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/5`

        },
        {
            id: 6,
            subject: 'asdgsdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/6`
        },
        {
            id: 7,
            subject: 'adsg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/7`
        },
        {
            id: 8,
            subject: 'asdgsdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/8`
        },
        {
            id: 9,
            subject: 'asdgsdg',
            artist: 'daminal',
            Like: 5,
            alert: '신고하기',
            url:`/sell/9`
        },
      ]);


    const nameList: any = Arr.map((ele) =>
    <React.Fragment key={ele.id}>
        <NFTFourList>
            <NFT>
                <Link href = {ele.url}>
                    <a>
                        <NFTImg>
                            {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                            <div><img/></div>
                        </NFTImg>
                    </a>
                </Link>
                <Line></Line>
                <NFTOne>
                    <NFTOneList>
                        <Link href = '/sell/view'><AStyle><NFTSubject>{ele.subject}</NFTSubject></AStyle></Link>     
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
    </React.Fragment>
    );

    const handleClick = (): void => {

        dispatch(PlusItemlist_REQUEST())
    };

    useEffect(() => {
        dispatch(Itemlist_REQUEST())
        setArr(list.itemList)
    },[])
    useEffect(() => {
       
        let cnt0: number = 0;
        
        function counterFn() {
            let id0 = setInterval(count0Fn, 55);
            function count0Fn() {
                cnt0++;
                setCount(cnt0)
                if (cnt0 > 50) {
                    return setCount(50)
                }

            }
        }
        counterFn();

        return () => setLoading(false);

    }, [])

    return (
        <>
            <div>
                <PictureNumberNotice>
                    전체 NFT 리스트 (총 {count}개 발행됨)
                </PictureNumberNotice>
                <SelectBox onChange={props.selectChange}>
                    <SelectOption value="sell_recent">
                        최근 발행 순
                    </SelectOption>
                    <SelectOption value="sell_likes">
                        좋아요 순
                    </SelectOption>
                </SelectBox>
            </div>
            <NFTComponent>
                <Category CategoryState={props.CategoryState}/>
                <div>
                    <div>
                        <ul>
                            {nameList}
                        </ul>
                    </div>
                </div>
            </NFTComponent>
            <MoreNFT onClick = {handleClick}>more</MoreNFT>
        </>
    )
}

export default ItemListSell