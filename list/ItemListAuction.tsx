import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Category from '../common/Category'
import { ItemListCSS } from './ItemListCSS'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../reducers"
import { ItemAuction_REQUEST } from '../../reducers/list'
import { PlusAuctionlist_REQUEST } from '../../reducers/list'

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

    let [loading, setLoading] = useState<boolean>(true)
    let [count, setCount] = useState<number>(0)
    let [Load, setLoad] = useState<boolean>(false)
    const dispatch = useDispatch()
    const list = useSelector((state:RootState) => state.list);

    const handleClick = () => {
        dispatch(PlusAuctionlist_REQUEST(list.auctionlength))
    };

    useEffect(() => {
        dispatch(ItemAuction_REQUEST())
        setArr(list.auctionList)
       setLoad(true)
       console.log()
    },[Load])

    useEffect(() => {

        let cnt0: number = 0;

        counterFn();

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

        return () => setLoading(false);

    }, [])

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
        }
        
      ]);


    const nameList: any = list.auctionList.map((ele) =>
        <React.Fragment key={ele.id}>
            <NFTFourList>
                <NFT>
                    <Link href= {ele.url}>
                        <a>
                            <NFTImg>
                                 {/* <IMG src = {ele.img.split('?')[0]}/> */}
                            </NFTImg>
                        </a>
                    </Link>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                            <Link href="/auction/auctionview"><AStyle><NFTSubject>{ele.subject}</NFTSubject></AStyle></Link>
                            {/* <NFTSubject>{ele.subject}</NFTSubject> */}
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
                    <SelectOption value="auction_recent">
                        최근 발행 순
                    </SelectOption>
                    <SelectOption value="auction_likes">
                        좋아요 순
                    </SelectOption>
                </SelectBox>
            </div>
            <NFTComponent>
                <Category CategoryState={props.CategoryState} />
                <div>
                    <div>
                        <ul>
                            {nameList}
                        </ul>
                    </div>
                </div>
            </NFTComponent>
            <MoreNFT onClick={handleClick}>more</MoreNFT>
        </>
    )
}

export default ItemListAuction