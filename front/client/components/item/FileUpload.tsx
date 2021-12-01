import Styled from 'styled-components';
import React from "react";

const FileUpload = ({fileChange, fileBase, deleteFile, setMainImage, mainImgIdx}) =>{
    return(
        <>
            <SmallTitle>
                파일 업로드
            </SmallTitle>
            <DescText>
                NFT에 넣을 이미지/영상 파일을 업로드해 주세요. 최대 10MB까지 업로드할 수 있으며, 지원하는 파일 포맷은 아래와 같습니다. <br/>
                - 이미지: PNG, JPEG, GIF, WEBP (가로 세로 사이즈 600px 이상) <br/>
            </DescText>
            <UploadWrapper>
                <BlueButton htmlFor = "fileUp">파일 선택</BlueButton>
                <input type = "file" id = "fileUp" 
                onChange = {fileChange.bind(this)} 
                accept="image/*"
                multiple
                />
            </UploadWrapper>
            <PrevWrapper>
                {fileBase.map((x, k) => {
                    return(
                        <ImageContent key = {k}>
                            {mainImgIdx == k 
                            ?                         
                            <ImageWrapper onClick = {()=>{setMainImage(k)}}>
                                <img src={x}/>
                                <CloseButton onClick = {()=>{deleteFile(k)}}>&#10006;</CloseButton>
                                <MainImageText>대표사진</MainImageText>
                            </ImageWrapper>
                            :  // https://dfassf-bucket-test.s3.ap-northeast-2.amazonaws.com/d9b9e0e9ccb65020e321b73ac933ad83
                            <>
                                <MainImageWrapper>
                                    <img src={x} onClick = {()=>{setMainImage(k)}} />
                                    <CloseButton onClick = {()=>{deleteFile(k)}}>&#10006;</CloseButton>
                                </MainImageWrapper>
                            </>
                            }
                            {/* <ImageWrapper onClick = {()=>{setMainImage(k)}}>
                                <img src={x}/>
                                <CloseButton
                                    onClick = {()=>{deleteFile(k)}}
                                >&#10006;</CloseButton>
                            </ImageWrapper> */}
                        </ImageContent>
                    )
                })}
            </PrevWrapper>
        </>
    )
}

const ImageWrapper = Styled.div`
    border: solid 2px red;
    box-sizing: border-box;
    width:90px;
    height:90px;
    padding: 10px;
`

const MainImageWrapper = Styled.div`
    /* border: solid 2px black; */
    box-sizing: border-box;
    width:90px;
    height:90px;
    padding: 10px;
    `

const MainImageText = Styled.div`
    background-color: white;
    opacity: 0.8;
    border-radius: 3px;
    /* border: solid 1px blue; */
    width: 60px;
    height: 20px;
    font-size: 15px;
    
    position: absolute;
    left: 3px;
    top: 3px;
`

const SmallTitle = Styled.h4`
    margin-top: 30px;
    font-size:24px;
    margin-bottom:20px;
`

const DescText = Styled.div`
    color:gray;
    font-size:16px;
`

const UploadWrapper = Styled.div`
    margin-top: 20px;
    height:50px;
    width: 50px;
    padding: auto;
    position: relative;
    input{
        display: none;
    }
`

const BlueButton = Styled.label`   
    background-color: #2d3741;
    border-radius:5px;
    width: 100px;
    height: 40px;
    position:absolute;
    left: 0%;
    top: 10%;
    border: none;
    outline: none;
    color: white;   
    cursor: pointer;
    text-align: center;
    line-height: 40px;
`

const PrevWrapper = Styled.div`
    width: 880px;
    height: 85px;
    margin-top: 20px;
    margin-bottom: 20px;
`

const ImageContent = Styled.div`
    /* border: solid 1px black; */
    width: 80px;
    float: left;
    margin-right: 8px;
    img{
        width: 70px;
        height: 70px;
        margin-left: -2px;
        margin-top: -2px;
    }
    position: relative;
`

const CloseButton = Styled.div`
    position: absolute;
    right: -10px; //여기에
    top: 0px; //여기에
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


export default FileUpload
