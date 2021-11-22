import Styled from 'styled-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from "../../reducers"


const NotSelled = () => {

    interface ArrEle {
        id: number,
        subject: string,
        artist: string,
        Like: number,
        alert: string
    }

    const notsellednftList = useSelector((state:RootState)=>state.list.notsellnftList)

    const [Arr, setArr] = React.useState<ArrEle[]>([
        {
            id: 1,
            subject: 'see',
            artist: 'daminal',
            Like: 0,
            alert: '신고하기'
        },
      ]);


    const nameList: JSX.Element[] = notsellednftList.map((ele) =>
        <React.Fragment key={ele.item_code}>
            <NFTFourList>
                <NFT>
                    <NFTImg>
                        {/* <div><img src={require('../../src/지도.jpg').default} /></div> */}
                        <div><img/></div>
                    </NFTImg>
                    <Line></Line>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>{ele.title}</NFTSubject>
                            {/* 여기 a 빠졌는데 동작되는 이유.. a 추가하면 오류남 */}
                            <NFTartist>{ele.item_code}</NFTartist>
                        </NFTOneList>
                        <NFTOneImg>
                            <img></img>
                        </NFTOneImg>
                    </NFTOne>
                    <NFTOne>
                        <NFTOneList>
                            <NFTSubject>@ {ele.hits}</NFTSubject>
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
            <div>{nameList}</div>
        </>
    )
}

export default NotSelled



const NFTFourList = Styled.ul`
    display:inline-block;
    list-style:none;
    margin-right:18px;
    margin-left:11px;
    
`
const NFT = Styled.li`
    border: 1px solid #bbb;
    border-radius:7px;
    height:360px;
    width:243px;
    box-sizing:border-box;
    padding:19px;
    margin-bottom:20px;
    box-shadow:3px 3px 10px #bbb;
`
const NFTImg = Styled.div`
    background:#bbb;
    width:200px;
    height:200px;
    cursor:pointer;
`

const NFTOne = Styled.ul`
    padding:0px;
    clear:both;
`

const NFTOneList = Styled.li`
    display:inline-block;
    list-style:none;
    float:left;
    margin-top:18px;

`
const NFTOneImg = Styled.li`
    display:inline-block;
    list-style:none;
    float:right;
    margin-top:18px;
    background:#bbb;
    width:35px;
    height:35px;

`

const NFTDeclaration = Styled.li`
    display:inline-block;
    list-style:none;
    float:right;
    margin-top:22px;
    width:35px;
    height:35px;
    color:grey;
    font-weight:bold;
    margin-left:30px;


`
const NFTSubject = Styled.div`
    font-weight:bold;
`

const NFTartist = Styled.div`
     color:#bbb;

`
const Line = Styled.div`
    background:#bbb;
    margin-top:20px;
    height:1px;
`
