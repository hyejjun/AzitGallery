import Styled from 'styled-components'
import React,{useEffect,useState} from 'react'
import MyNft from './MyNFT'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import ItemListSell from './ItemListSell'
import ItemListAuction from './ItemListAuction'
import { main_all_direct_REQUEST } from '../../reducers/main'
import { RootState } from "../../reducers"

const ItemList = () => {
    const [sellState,setSellState] = useState<boolean>(false)
    const [category, setCategory] = useState<number>(0)
    const [subCategory,setSubCategory] = useState<number>(0)
    const dispatch = useDispatch()
    const Main = useSelector((state:RootState) => state.main);
    
    useEffect(()=>{
        if(sellState==true){
            // 경매인 경우
            dispatch(main_all_direct_REQUEST(sendData))
        }
        if(sellState==false){
            // 즉시판매인 경우
            dispatch(main_all_direct_REQUEST(sendData))
        }        
    },[sellState])

    let sendData = {
        sell_type:sellState,
        list_length:3,
        list:0
    }
    

    return(
        <>
            <MyNft/>
            <MainExplanation>
                당신만을 위한 단 하나의 NFT
            </MainExplanation>
            <MenuBar>
                <Menu>
                    <SellTab flag={sellState} onClick={()=>{setSellState(false)}}>판매</SellTab>
                </Menu>
                <Menu>
                    <div className="bar">|</div>
                </Menu>
                <Menu>
                    <AuctionTab flag={sellState} onClick={()=>{setSellState(true)}}>경매</AuctionTab>
                </Menu>
            </MenuBar>
            <div>
                {
                    sellState
                    ?
                    <ItemListAuction sell_type={sellState} sendData ={sendData} setCategory={setCategory} setSubCategory={setSubCategory}/>
                    :
                    <ItemListSell sell_type={sellState} sendData ={sendData} setCategory={setCategory} setSubCategory={setSubCategory}/>
                }
            </div>
        </>
    )
}

export default ItemList

const MainExplanation = Styled.span`
    font-size: 22px;
    font-weight: bold;
    color: #000000b3;
    /* background: #e6e6fa80; */

`

const Menu = Styled.li`
    color:#2d3741;
    display:inline-block;
    text-decoration:none;
    list-style:none;
    margin-right:20px;
    float:left;

    .bar {
        cursor: default;
        font-size: 23px;
        color: #e8e8e9;
    }
`

const MenuBar = Styled.ul`
    clear: both;
    height: 125px;
    float : right;
`

const SellTab = Styled.div<{flag:boolean}>`
    cursor:pointer;
    font-size: 23px;
    color: ${props => (props.flag ? '#a0a0a0b3' : '#000000b3')};
    font-weight: ${props => (props.flag ? 'none' : 'bold')};
`

const AuctionTab = Styled.div`
    cursor:pointer;
    font-size: 23px;
    color:  ${props => (props.flag ? '#000000b3' : '#a0a0a0b3')};
    font-weight: ${props => (props.flag  ? 'bold' : 'none')};
`
