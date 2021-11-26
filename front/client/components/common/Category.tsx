import Link from 'next/link';
import Styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import { category_REQUEST } from '../../reducers/type';
import { sub_category_REQUEST } from '../../reducers/type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../reducers"
import { Itemlist_REQUEST } from '../../reducers/list'
const Category = (props) => {
    const dispatch = useDispatch()
    const Type = useSelector((state:RootState) => state.type);
    const { genderTab, genderTabOpen, selectGender, genderSelect } = props.CategoryState
    const [subcategory, setsubCategory] = useState<number>(0)
    const [Load,setLoad] = useState(false)
    const [List, setList] = useState<number>(0);
    const handleList = (e) => {
        setList(e)
    }

    // const category = (E) => {
    //     dispatch(category_REQUEST())
        
    // }

    useEffect(()=>{
        dispatch(category_REQUEST())
        setLoad(true)
    },[Load])

    const handlesub = (key,ele) => {
        
        let data = {
            key:key,
            ele:ele
        }
        dispatch(sub_category_REQUEST(data))
    }
    return (
        <CategoryWrapper>
            <H3>전체 카테고리</H3>
            { Type.main == undefined ? ''
            : Type.main.map((ele,key)=>
            <React.Fragment key={ele.main_category_code}>
                <Ul>
                    <Line></Line>
                    <Subject onClick={() => { selectGender(key+1), handleList(key+1) }}>{Type.main[key] == undefined ? '로딩중' : Type.main[key].category_name}</Subject>
                    <Line></Line>
                    {List == key+1 ?
                        <>
                            <LI className = "female" >{Type.sub[0] == undefined ? '로딩중' : Type.sub[key][0].sub_category_name}</LI>
                            <LI className =" male" >{Type.sub[0] == undefined ? '로딩중' : Type.sub[key][1].sub_category_name}</LI>
                        </>
                        :
                        <li></li>
                    } 
                </Ul>
             </React.Fragment>)
        }
        </CategoryWrapper>
    )
}

export default Category

const CategoryWrapper = Styled.div`
    width: 20%;
    height: auto;
    /* background: yellow; */
    display : inline-block;

    @media screen and (max-width : 1095px) {
    display:none;
}
`
const H3 = Styled.div`
    font-size: 18px;
    margin-bottom:20px;
    cursor : default;
`

const Subject = Styled.li`
    font-size: 15px;
    margin-bottom:8px;
    cursor : pointer;
`

const Line = Styled.li`
    height:2px;
    background:#bbb;
    margin-bottom:10px;
`

const Ul = Styled.ul<{flag:boolean}>`
    .female{
        color: ${props => (props.flag == 1 ? '#000000' : '#777')};
        font-weight: ${props => (props.flag == 1 ? 'bold' : 'none')};
        text-decoration : ${props => (props.flag == 1 ? 'underline' : 'none')};
    }

    .male{
        color: ${props => (props.flag == 2 ? '#000000' : '#777')};
        font-weight: ${props => (props.flag == 2 ? 'bold' : 'none')};
        text-decoration : ${props => (props.flag == 2 ? 'underline' : 'none')};
    }

    .child{
        color: ${props => (props.flag == 3 ? '#000000' : '#777')};
        font-weight: ${props => (props.flag == 3 ? 'bold' : 'none')};
        text-decoration : ${props => (props.flag == 3 ? 'underline' : 'none')};
    }

`

const LI = Styled.li`
    height: 40px;
    font-size: 14px;
    line-height: 29px;
    letter-spacing: -1px;
    color: #777;
    padding-bottom: 10px;
    cursor : pointer;
    &:hover{
        color:black
    }
`