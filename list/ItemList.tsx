import Styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import ItemListSell from './ItemListSell'
import ItemListAuction from './ItemListAuction'
import MyNft from './MyNFT'
import useInput from '../../hooks/useInput'
import SearchBar from './SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import { sellType_REQUEST, genderCategorySelect_REQUEST, itemSearch_REQUEST, itemSort_REQUEST } from '../../reducers/type'
import axios from 'axios'
import {url} from '../../saga/url'
import { RootState } from "../../reducers"
const ItemList = () => {
    const dispatch = useDispatch()

    // @ 판매 경매 선택 버튼
    const [tabBtn, settabBtn] = useState<boolean>(true);

    // @ 주문이 들어오면 state를 바꿔줌; useEffect로 알람 띄울 것
    const [notiOn, setNotiOn] = useState<boolean>(false)

    const notiHandler = async () => {
        let {data} = await axios.post(`${url}/sendnoti`,{data:'send noti router 나중에 연결해야 함'})

        // if(data.message == 'unread'){
        //     setNotiOn(true)
        // }
    }
    notiHandler()
    useEffect(()=>{
        if(notiOn === true){
            alert('확인하지 않은 주문이 있습니다.')
        }
    },[notiOn])

    const sellBtn = () => {
        settabBtn(true)
        dispatch(sellType_REQUEST(sendData))
    }

    const auctionBtn = () => {
        settabBtn(false)
        dispatch(sellType_REQUEST(sendData))
    }

    // @ 성별 탭
    const [genderTab, setGenderTab] = useState<boolean>(false);
    const [list2,setlist] = useState<Array<any>>([])
    const genderTabOpen = () => {
        setGenderTab(prev => !prev)
    }



    // @ 0 미선택 1 여성복 2 남성복 3 아동복
    const [genderSelect, setGenderSelect] = useState<number>(0);
    const Type = useSelector((state:RootState) => state.type);
    const listReudcer = useSelector((state:RootState) => state.list);
    let GenderList = Type.categoryData

    const selectGender = (num) => {
        setGenderSelect(num)
        dispatch(genderCategorySelect_REQUEST(sendData))
        setlist(listReudcer.itemList)
    }

    const CategoryState = {
        genderTab,
        genderTabOpen,
        genderSelect,
        selectGender,
        GenderList,
        list2,
        
    }

    // @ 최근 발행순 좋아요 순 선택
    const [select, setSelect] = useState<string>('')

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelect(value)
        dispatch(itemSort_REQUEST(sendData))
    };

    // @ 검색창
    const [search, onChangeSearch] = useInput('')

    const searchSubmit = () => {
    if (search !== '') {
            dispatch(itemSearch_REQUEST(sendData))
        }
    }

    // @ axios 통신 시 보내야 할 데이터들
    const sendData = {
        tabBtn,                         // @ 판매 or 경매 
        genderSelect,                   // @ 0 미선택 1 여성복 2 남성복 3 아동복
        select,  
        setSelect,                       // @ 최근 발행순 좋아요 순 선택
        search,
        searchSubmit                 // @ 검색창
    }


    return (
        <>
            <MyNft />
            <MenuBar>
                <Menu>
                    <SellTab onClick={sellBtn} flag={tabBtn}>판매</SellTab>
                </Menu>
                <Menu>
                    <div className="bar">|</div>
                </Menu>
                <Menu>
                    <AuctionTab onClick={auctionBtn} flag={tabBtn}>경매</AuctionTab>
                </Menu>
                <SearchBar search={search} onChangeSearch={onChangeSearch} searchSubmit={searchSubmit} />
            </MenuBar>
            <div>
                {
                    tabBtn === true
                        ? <ItemListSell CategoryState={CategoryState} sendData={sendData} selectChange={selectChange} />
                        : <ItemListAuction CategoryState={CategoryState} selectChange={selectChange} />
                }
            </div>

        </>
    )
}

export default ItemList

const Menu = Styled.li`
    color:#2d3741;
    display:inline-block;
    text-decoration:none;
    list-style:none;
    margin-right:20px;
    float:left;

    .bar {
        cursor : default;
        font-size: 20px;
    }
`

const MenuBar = Styled.ul`
    clear:both;
    height: 100px;
`

const SellTab = Styled.div<{flag:boolean}>`
    cursor:pointer;
    font-size: 23px;
    color: ${props => (props.flag == true ? '#000000b3' : '#a0a0a0b3')};
    font-weight: ${props => (props.flag == true ? 'bold' : 'none')};
`

const AuctionTab = Styled.div<{flag:boolean}>`
    cursor:pointer;
    font-size: 23px;
    color:  ${props => (props.flag == false ? '#000000b3' : '#a0a0a0b3')};
    font-weight: ${props => (props.flag == false ? 'bold' : 'none')};
`


