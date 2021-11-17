import Styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Category from '../common/Category'
import { ItemListCSS } from './ItemListCSS'
import { Itemlist_REQUEST } from '../../reducers/list'
import { PlusItemlist_REQUEST } from '../../reducers/list'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../reducers"
import { SetQuery_REQUEST } from "../../reducers/list"
import { sellType_REQUEST, genderCategorySelect_REQUEST, itemSearch_REQUEST, itemSort_REQUEST } from '../../reducers/type'

const ItemListSell = (props) => {

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

    const { gender, List, handlegender, genderSelect,  handleList, genderTab, list2 } = props.CategoryState
    const { search, setSelect, select, tabBtn } = props.sendData
    const dispatch = useDispatch()
    const list = useSelector((state:RootState) => state.list);
    const type = useSelector((state:RootState) => state.type);
    let [loading, setLoading] = useState<boolean>(false)
    let [Load, setLoad] = useState<boolean>(false)


    let [count,setCount] = useState<number>(0)

    const handleClick = () => {

        dispatch(PlusItemlist_REQUEST(list.listlength))
        setArr(list.itemList)

    };
    //dispatch(PlusItemlist_REQUEST(list.listlength))
    const sendData = {

        genderSelect,    
                       // @ 0 미선택 1 여성복 2 남성복 3 아동복
    }


    useEffect(() => {
        dispatch(genderCategorySelect_REQUEST(sendData))
        setArr(list.itemList)
    },[genderSelect])


    useEffect(() => {
        setArr(list.itemList)
    },[select])

    useEffect(()=>{
         setArr(list.itemList)
    },[search])

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

    useEffect(() => {
        dispatch(Itemlist_REQUEST())
    },[!loading])
    

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
        
      ]);



    const nameList: any = list.itemList.map((ele) =>
    <React.Fragment key={ele.id}>
        <NFTFourList>
            <NFT>
                <Link href = {ele.url}>
                    <a>
                        <NFTImg>
                            {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                            <IMG src = {ele.img.split('?')[0]}/>
                        </NFTImg>
                    </a>
                </Link>
                <Line></Line>
                <NFTOne>
                    <NFTOneList>
                        <Link href = {ele.url}><AStyle><NFTSubject>{ele.subject}</NFTSubject></AStyle></Link>     
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


    return (
        <>
            <div>
                <PictureNumberNotice>
                    전체 NFT 리스트 (총 {count}개 발행됨)
                </PictureNumberNotice>
                <SelectBox onChange={props.selectChange}>
                    <SelectOption value="sell_recent">
                        좋아요 순
                    </SelectOption>
                    <SelectOption value="sell_likes">
                        최근 발행 순
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