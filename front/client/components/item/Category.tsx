import Styled from 'styled-components';
import React, { useEffect, useState } from "react";

const Category = ({handleCategory, category, bigCategory, smallCategory}) => {
    const loadBigCategory = () => {
// {id: 2, main_category_idx: 1, item_code: '102', sub_category_code: '2', sub_category_name: '블라우스'}

        if(category.length>0){
            return(<>
                {category[0].map((x,k)=>{
                    return(
                        <option value ={x.main_category_code} key = {k}>{x.category_name}</option>
                    )
                })}
            </>)
        }       
    }

    const loadSmallCategory = (type) => {
        if(category.length>0){
            if(category[1].length>0){
                return(<>
                    {category[1].map((x,k)=>{                        
                        if(type === x.main_category_idx.toString()){
                            return(
                                <option value ={x.item_code} key = {k}>{x.sub_category_name}</option>
                            )
                        } 
                    })}
                </>)
            } 
        }
    }
    return(
        <>
        <SectionWrapper>
            <SmallTitle>
                카테고리 
            </SmallTitle>
            {/* 아래부분이상 없으면 나중에 지울 것 */}
            {/* <SmallerTitle>성별</SmallerTitle>
            <select className = "category" onChange = {(e)=>handleCategory(e,"gender")}>
            <option>선택</option>
                <option value = "female">여성</option>
                <option value = "male">남성</option>
                <option value = "kids">아동</option>
                <option value = "common">남녀 공용</option>
            </select> */}
            <SmallerTitle>대분류</SmallerTitle>
            <select className = "category" onChange = {(e)=>handleCategory(e,"bigc")}>
            <option>선택</option>
                {loadBigCategory()}
            </select>
            <SmallerTitle>소분류</SmallerTitle>
            <select className = "category" onChange = {(e)=>handleCategory(e,"smallc")}>
            <option>선택</option>
            {loadSmallCategory(bigCategory)}
            </select>
        </SectionWrapper>
        </>
    )
}

export default Category

const SectionWrapper = Styled.div`
    margin-bottom: 50px;
    display: block;
    .category{
        margin-top: 40px;
        display: block;
        width: 400px;
        height: 34px;
        font-size: 20px;
    }
`

const SmallTitle = Styled.h4`
    margin-top: 30px;
    font-size:20px;
    margin-bottom:20px;
    display: block;
`
const SmallerTitle = Styled.div`
    color:#2d3741; 
    font-size:20px;
    margin-top:20px;
    margin-bottom: -30px;
    display: block;
`