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
    n, ifSell, extension, 
    sellToggle, extensionToggle, ifAgreed,
    handleTxtChange, handleSubmit, handleConfirm,
    fileChange, fileBase, handleCurrency,
    deleteFile, resetState, 
    handleItemType
    }) => {

    const dispatch = useDispatch()
    const mint = useSelector((state:RootState) => state.mint);
    const [nftCreateState,setnftCreateState] = useState<boolean>(false);
    const createNftCh = () => {
        dispatch(MintNFT_REQUEST())
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
        dispatch(MintNFT_REQUEST())
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
                        카테고리
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
`

const InputBox = Styled.input`
    width: 690px;
    height: 30px;
    font-size: 25px;
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