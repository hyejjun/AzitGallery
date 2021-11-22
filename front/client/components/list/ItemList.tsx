import Styled from 'styled-components'
import MyNft from './MyNFT'
import ItemListSell from './ItemListSell'
import {useState} from 'react'
import SearchBar from './SearchBar'


const ItemList = (props) => {
    const [sellState,setSellState] = useState<boolean>(false)
    const onClick = () => {
        setSellState(prev=>!prev)
    }
    return(
        <>
            <MyNft/>
            <MenuBar>
                <Menu>
                    <SellTab onClick={()=>{setSellState(false)}}>판매</SellTab>
                </Menu>
                <Menu>
                    <div className="bar">|</div>
                </Menu>
                <Menu>
                    <SellTab onClick={()=>{setSellState(true)}}>경매</SellTab>
                </Menu>
                <SearchBar/>
            </MenuBar>
            <div>
                <ItemListSell sellState={sellState}/>
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
    //color: ${props => (props.flag == true ? '#000000b3' : '#a0a0a0b3')};
    //font-weight: ${props => (props.flag == true ? 'bold' : 'none')};
`

const AuctionTab = Styled.div<{flag:boolean}>`
    cursor:pointer;
    font-size: 23px;
    //color:  ${props => (props.flag == false ? '#000000b3' : '#a0a0a0b3')};
    //font-weight: ${props => (props.flag == false ? 'bold' : 'none')};
`

