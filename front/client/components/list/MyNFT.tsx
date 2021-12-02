// 메인 페이지에 있는 새 NFT 등록하기 배너

import Styled from 'styled-components'
import Link from 'next/link'
import Button from '@mui/material/Button';

const MyNFT = () => {
    return (
        <>
            {/* <MyNFTAll>
                <MenuH3>당신의 옷을 NFT로 발급해보세요.</MenuH3>
                <div>NFT STORE 에서는 누구나 쉽고 간편하게<br />NFT를 발행하고 관리할 수 있어요.</div>
            </MyNFTAll> */}
            <MyNFTAll>
                <Menu>
                    <MenuH3>당신의 옷을 NFT로 발급해보세요.</MenuH3>
                    <div>NFT STORE 에서는 누구나 쉽고 간편하게<br />NFT를 발행하고 관리할 수 있어요.</div>
                </Menu>

                <MenuImg> <img src={`https://dfassf-bucket-test.s3.ap-northeast-2.amazonaws.com/ada96412ebd121f98653a9cf2198a358`} /> </MenuImg>
            </MyNFTAll>
            <Line></Line>
        </>
    )
}
export default MyNFT
const MyNFTAll = Styled.div`
    height: 480px;
    cursor: default;
    padding: 7% 0;
    box-sizing: border-box;
    
`
const Menu = Styled.li`
    color:#2d3741;
    font-size:24px;
    display:inline-block;
    text-decoration:none;
    list-style:none;
    margin-right:20px;
    float:left;
    & > a {
        margin-top:100px;
        display : inline-block;
    }
    & > a > button {
        width : 200px;
        height : 50px;
        
    }
`
const MenuImg = Styled.li`
    display: inline-block;
    -webkit-text-decoration: none;
    float: right;
    margin-top: 20px;
    margin-right: 50px;
    width: 280px;
    height: 300px;

    & > img {
        display: inline-block;
        width: 100%;
    }
`
const MenuH3 = Styled.h3`
    font-size:42px;
    margin-top:50px;
    margin-bottom:30px;
`
const SellBtn = Styled.button`
    margin-top:80px;
    background:#2d3741;
    color:white;
    width:210px;
    height:70px;
    font-size:22px;
    border-radius:5px;
    cursor:pointer;
    &:hover{
        background:white;
        color:#2d3741;
        border:1px solid #2d3741;
    }
`
const Line = Styled.div`
    background: #e8e8e9;
    margin-top: 20px;
    height: 2px;
    margin-bottom: 50px;
`