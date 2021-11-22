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
    
    const dispatch = useDispatch()
    const main = useSelector((state:RootState) => state.main);
    const [listLength,setListLength] = useState<number>(0)
    const [categorySt,setCategorySt] = useState<Object>({})
    
    
    
    const moreClick = () => {
        dispatch(main_all_REQUEST({sell_type:props.sellState,list_length:main.mainitemList.length+3}))
        setListLength(main.mainitemList.length)
        if(!props.sellState){
            setListLength(0)
        }else if(props.sellState){
            setListLength(0)
        }
    }
    
    const handleChange = (e) => {
        console.log(e.target.value)
        let value = e.target.value
        console.log(categorySt,'categorysttttttttttttttt')
        dispatch(main_all_REQUEST({sell_type:props.sellState,list_length:main.mainitemList.length,orderBy:value,categorySt:categorySt}))
    }

    useEffect(() => {
        setListLength(0)
        dispatch(main_all_REQUEST({sell_type:props.sellState,list_length:listLength+3}))
        setListLength(0)
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
            </div>
            <NFTComponent>
                <Category 
                    sellState={props.sellState} 
                    listLength={listLength}
                    setCategorySt={setCategorySt}
                    
                />
                <div>
                    <div>
                        <ul>
                            {nameList}
                        </ul>
                    </div>
                </div>
            </NFTComponent>
            <MoreNFT onClick = {()=>{moreClick()}}>more</MoreNFT>
        </>
    )
}

export default ItemListSell