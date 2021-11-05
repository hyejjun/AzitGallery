import Styled from 'styled-components'
import React, { useState } from "react"
import SellType from './SellType'
import Agreement from './Agreement'
import CreateNftCh from './CreateNftCh'
import CancelNft from './CancelNft'
import FileUpload from './FileUpload'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { MintNFT_REQUEST } from "../../reducers/mint";
import { RootState } from "../../reducers"

const AddItemComponent = ({
    n, ifSell, extension, sellToggle, extensionToggle, ifAgreed,
    handleTxtChange, handleSubmit, handleConfirm,
    fileChange, fileBase, handleCurrency, deleteFile, 
    resetState, handleItemType, handleTags, deleteItem,
    color, size, handleKeyPress, colorVal, sizeVal,
    }) => {

    const dispatch = useDispatch()
    const mint = useSelector((state:RootState) => state.mint);
    const [nftCreateState,setnftCreateState] = useState<boolean>(false);
    const createNftCh = () => {
        const data = {color:color, size:size}
        dispatch(MintNFT_REQUEST(data))
        if(handleConfirm() === true){
            setnftCreateState(prev=>!prev)
        }
    }
    
    const [cancelNft,setcancelNft] = useState<boolean>(false);

    const cancelNftCh = () => {
        setcancelNft(prev=>!prev)
    }
    const closeBtn = () => {
        setcancelNft(false)
        setnftCreateState(false)
    }

    const test = () => {
     
    }

    const ColorBar = () => {
        return (
            <BarWrapper>
                {color.map((x,k)=>{
                    return (
                        <ColorSizeItem key = {k}>
                            {x}
                            <CloseButton 
                            onClick = {()=>{deleteItem(k,"color")}}
                            >&#10006;</CloseButton>
                        </ColorSizeItem>
                    )
                })}
            </BarWrapper>
        )
    }

    const SizeBar = () => {
        return (
            <BarWrapper>
            {size.map((x,k)=>{
                return (
                    <ColorSizeItem key = {k}>
                        {x}
                        <CloseButton
                        onClick = {()=>{deleteItem(k,"size")}}
                        >&#10006;</CloseButton>
                    </ColorSizeItem>
                    
                    )
                })}
            </BarWrapper>
        )
    }
    
    return(
        <>
            {nftCreateState 
            ? < CreateNftCh 
                flag={nftCreateState} 
                closeBtn={closeBtn} 
                handleSubmit = {handleSubmit}
                resetState = {resetState}
                /> :<></> }
            {cancelNft ? < CancelNft flag={cancelNft} closeBtn={closeBtn}/> :<></>}
            <TopWrapper> 
                <BigTitle onClick = {test}>
                    새로운 NFT 발행하기
                </BigTitle>
                <SectionWrapper>
                    <FileUpload 
                    fileChange = {fileChange}
                    fileBase = {fileBase} 
                    deleteFile = {deleteFile}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SellType 
                        ifSell = {ifSell} 
                        extension = {extension}
                        sellToggle = {sellToggle}
                        extensionToggle = {extensionToggle}
                        handleTxtChange = {handleTxtChange}
                        handleCurrency = {handleCurrency}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        이름
                    </SmallTitle>
                    <InputBox
                        onChange = {(e)=>handleTxtChange(e,"name")}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        분류
                    </SmallTitle>
                    <select className = "category" onChange = {handleItemType}>
                            <option value = "female">여성</option>
                            <option value = "male">남성</option>
                            <option value = "kids">아동</option>
                            <option value = "common">남녀 공용</option>
                    </select>
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        색상 및 사이즈`
                    </SmallTitle>
                    <DescText>엔터를 누르면 자동으로 입력되며 띄어쓰기는 불가합니다.</DescText>
                    <SmallerTitle>색상</SmallerTitle>
                    <InputBox
                        onChange = {(e)=>handleTags(e,"color")}
                        onKeyPress = {(e)=>handleKeyPress(e,"color")}
                        value = {colorVal}
                    />
                    <ColorBar/>
                    <SmallerTitle>사이즈</SmallerTitle>
                    <InputBox
                        onChange = {(e)=>handleTags(e,"size")}
                        onKeyPress = {(e)=>handleKeyPress(e,"size")}
                        value = {sizeVal}
                    />
                    <SizeBar/>
                </SectionWrapper>
                <SectionWrapper>
                    <SmallTitle>
                        설명
                    </SmallTitle>
                    <TextBox
                        onChange = {(e)=>handleTxtChange(e, "desc")}
                    />
                </SectionWrapper>
            </TopWrapper>
            <Agreement
            ifAgreed = {ifAgreed}
            />
            <BottomBtnWrapper>
                <LeftBtn onClick={()=>{cancelNftCh()}}>취소</LeftBtn>
                <RightBtn onClick={()=>{createNftCh()}}>NFT 발행하기<br/>(오늘{n}개 발행 가능)</RightBtn>
            </BottomBtnWrapper>    
        </>
    )
}

export default AddItemComponent

const TopWrapper = Styled.div`
    width: 1000px;
    margin: 0 auto;
`

const SectionWrapper = Styled.div`
    margin-bottom: 50px;
    display: block;
    .category{
        margin-top: 40px;
        display: block;
        width: 400px;
        height: 34px;
        font-size: 25px;
    }
`

const BigTitle = Styled.h3`
    font-size:42px;
`

const SmallTitle = Styled.h4`
    margin-top: 30px;
    font-size:24px;
    margin-bottom:20px;
    display: block;
`

const SmallerTitle = Styled.div`
    color:#2d3741; 
    font-size:20px;
    margin-top:20px;
    display: block;
`

const DescText = Styled.div`
    color:gray;
    font-size:16px;
`

const InputBox = Styled.input`
    width: 690px;
    height: 30px;
    font-size: 25px;
    display: block;
    margin-bottom: 20px;
`

const TextBox = Styled.textarea`
    width:690px;
    height: 200px;
`

const BottomBtnWrapper = Styled.div`
    display: block;
    margin-bottom: 50px;
    width:1150px;
    height: 100px;
    position: relative;
`

const LeftBtn = Styled.button`   
    background-color: #e1f0fe;
    border-radius:5px;
    width: 100px;
    height: 60px;
    border: none;
    outline: none;
    color: #055fec;   
    position: absolute;
    left: 43%; 
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`

const RightBtn = Styled.button`   
    background-color: #055fec;
    border-radius:5px;
    width: 150px;
    height: 60px;
    border: none;
    outline: none;
    color: white;   
    position: absolute;
    left: 56%; 
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`

const BarWrapper = Styled.div`
    padding-top: 20px;
    padding-left: 10px;
    width: 695px;
    display: block;
    overflow: hidden;
`

const ColorSizeItem = Styled.div`
    background: lightgray;
    padding: 5px 20px 5px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    display: block;
    position: relative;
    border-radius: 5px;
`

const CloseButton = Styled.div`
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height:20px;
    border-radius: 10px;
    background-color:white;
    padding-left:4px;
    line-height:23px;
    box-sizing: border-box;
    cursor: pointer;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    opacity: 0.6;
`