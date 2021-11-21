import { ItemListCSS } from './ItemListCSS'
import Category from './Category'
import { RootState } from "../../reducers"
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { main_all_REQUEST } from '../../reducers/main'

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
    console.log(props.sellState,'sellstate')
    
    const dispatch = useDispatch()
    const main = useSelector((state:RootState) => state.main);
    const [listLength,setListLength] = useState<number>(main.mainitemList.length)
    
    
    const moreClick = () => {
        dispatch(main_all_REQUEST({sell_type:props.sellState,list_length:main.mainitemList.length}))

    }
    

    useEffect(() => {
        dispatch(main_all_REQUEST({sell_type:props.sellState,list_length:main.mainitemList.length}))
        //setListLength(main.mainitemList.length)
    },[props.sellState])

    const nameList: any = main.mainitemList.map((ele) =>
    <React.Fragment key={ele.item_id}>
        <NFTFourList>
            <NFT>
                {
                    ele.sell_type
                    ?
                    <Link href = {`auction/${ele.item_id}`}>
                        <a>
                            <NFTImg>
                                {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                                <IMG src = {ele.item_img_link}/>
                            </NFTImg>
                        </a>
                    </Link>
                    :
                    <Link href = {`sell/${ele.item_id}`}>
                        <a>
                            <NFTImg>
                                {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                                <IMG src = {ele.item_img_link}/>
                            </NFTImg>
                        </a>
                    </Link>
                }
                
                <Line></Line>
                <NFTOne>
                    <NFTOneList>
                        {
                            ele.sell_type
                            ?
                            <Link href = {`auction/${ele.item_id}`}><AStyle><NFTSubject>{ele.title}</NFTSubject></AStyle></Link>
                            :
                            <Link href = {`sell/${ele.item_id}`}><AStyle><NFTSubject>{ele.title}</NFTSubject></AStyle></Link>
                        }
                             
                        <NFTartist>{ele.nick_name}</NFTartist>
                    </NFTOneList>
                    <NFTOneImg>
                        <img></img>
                    </NFTOneImg>
                </NFTOne>
                <NFTOne>
                    <NFTOneList>
                        <NFTSubject>@ {ele.likes}</NFTSubject>
                    </NFTOneList>
                    <NFTDeclaration>
                        <NFTSubject>* * *</NFTSubject>
                    </NFTDeclaration>
                </NFTOne>
            </NFT>
        </NFTFourList>
    </React.Fragment>
    );

    return(
        <>
            <div>
                <PictureNumberNotice>
                    전체 NFT 리스트 (총 {/*count*/}개 발행됨)
                </PictureNumberNotice>
                <SelectBox>
                    <SelectOption value="sell_recent">
                        좋아요 순
                    </SelectOption>
                    <SelectOption value="sell_likes">
                        최근 발행 순
                    </SelectOption>
                </SelectBox>
            </div>
            <NFTComponent>
                {/* <Category CategoryState={props.CategoryState}/> */}
                <Category/>
                <div>
                    <div>
                        <ul>
                            {nameList}
                        </ul>
                    </div>
                </div>
            </NFTComponent>
            {/* <MoreNFT onClick = {handleClick}>more</MoreNFT> */}
            <MoreNFT onClick = {()=>{moreClick()}}>more</MoreNFT>
        </>
    )
}

export default ItemListSell