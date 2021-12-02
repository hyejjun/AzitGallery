import Styled from 'styled-components';
import React from "react";

const SellType = ({ ifSell, extension, sellToggle, extensionToggle, handleTxtChange, handleCurrency }) => {
    const ChkSell = () => {
        return (
            <RadioWrapper>
                <input type="radio" id="sell" value="1"
                    onChange={() => sellToggle(true)}
                    checked={ifSell == true ? true : false}
                />
                <label htmlFor="sell">일반 판매</label>
                <input type="radio" id="auc" value="2"
                    onChange={() => sellToggle(false)}
                    checked={ifSell == true ? false : true}
                />
                <label htmlFor="auc">경매</label>
            </RadioWrapper>
        )
    }

    return (
        <>
            <SmallTitle>
                즉시 판매 / 경매
            </SmallTitle>
            <DescText>
                판매 유형을 선택해주세요.
            </DescText>
            <ChkSell />
            {ifSell
                ?
                <SellAucWrapper>
                    <SmallerTitle>판매 가격</SmallerTitle>
                    <input className="startPrice" type="text" placeholder="판매가를 입력하세요." onChange={(e) => handleTxtChange(e, "price")} />
                    <span className="klay">KLAY</span>
                </SellAucWrapper>
                :
                <>
                    <SellAucWrapper>
                        <SmallerTitle>경매 시작 가격</SmallerTitle>
                        <input className="startPrice" type="text" placeholder="경매 시작가를 입력하세요." onChange={(e) => handleTxtChange(e, "aucPrice")} />
                        <span className="klay">KLAY</span>
                        <SmallerTitle>경매 종료 시간</SmallerTitle>
                        <input type="datetime-local" onChange={(e) => handleTxtChange(e, "aucTime")} className="dateTimeLocal" />
                        <Desc>새로운 경매 입찰자가 생기면 경매 종료 시간을 5분 연장할 수 있습니다.</Desc>
                    </SellAucWrapper>
                    <RadioWrapper>
                        <input type="radio" id="extOn" value="1"
                            onChange={() => extensionToggle(true)}
                            checked={extension == true ? true : false}
                        />
                        <label htmlFor="extOn">연장</label>
                        <input type="radio" id="extOff" value="1"
                            onChange={() => extensionToggle(false)}
                            checked={extension == true ? false : true}
                        />
                        <label htmlFor="extOff">연장하지 않음</label>
                    </RadioWrapper>
                </>
            }
        </>
    )
}

export default SellType

const RadioWrapper = Styled.div`
    margin-top: 10px;
    input{
        font-size: 23px;
        margin-right: 10px;
    }
    label{
        font-size: 23px;
        margin-right: 10px;
    }
`

const SellAucWrapper = Styled.div`
    width: 1000px;
    input{
        margin-top: 20px;
        margin-right: 20px;
        display: block;
        width: 400px;
        height: 30px;
        font-size: 23px;
        width:400px;
        float: left;
    }
    select{
        margin-top: 20px;
        display: block;
        width: 270px;
        height: 34px;
        font-size: 23px;
    }
    .dateTimeLocal{
        margin-right: 400px;
        margin-bottom: 20px;
        width:430px;
    }

    /* .startPrice{
        margin-top: 20px;
        margin-right: 20px;
        display: block;
        width: 400px;
        height: 30px;
        font-size: 23px;
        width: 400px;
        float: left;
        height: 65px;
        border: 1px solid #70767c9c;
        border-radius: 15px;
        padding: 10px;
        box-sizing: border-box;
    } */

    .klay {
        margin-top: 33px;
        margin-right: 20px;
        display: inline-block;
    }
`

const Desc = Styled.div`
    color:gray;
    font-size:16px;
    width: 500px;
    margin-top: 10px;
    margin-bottom: 10px;

`

const SmallTitle = Styled.h4`
    margin-top: 30px;
    font-size:20px;
    margin-bottom:20px;
`

const SmallerTitle = Styled.div`
    color:#2d3741; 
    font-size:20px;
    margin-top:20px;
`

const DescText = Styled.div`
    color:gray;
    font-size:16px;
`