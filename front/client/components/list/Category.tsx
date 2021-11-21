import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { category_REQUEST } from '../../reducers/type';
import { RootState } from "../../reducers"
import { all_category_REQUEST,sub_category_REQUEST,category_select_item_REQUEST } from '../../reducers/main'

const Category = (props) => {

    const dispatch = useDispatch()
    const Main = useSelector((state:RootState) => state.main);
    const CategoryType = Main.categoryList
    const SubType = Main.subList
    const [List, setList] = useState<number>(-1);


    useEffect(()=>{
        dispatch(all_category_REQUEST())
    },[])

    const handleList = (e) => {
        if(e.id-1==List){
            setList(-1)
        }else{
            setList(e.id-1)
        } 
        dispatch(sub_category_REQUEST(e.id))
    }
    const subSelect = (e) => {
        //console.log(e,'eeeeeeeeeeeeeeeeeee')
        //if()
        dispatch(category_select_item_REQUEST({e:e,sell_type:props.sellState,listLength:props.listLength+3}))
    }
    const subCategory:any = SubType.map((ele,key)=>
        <React.Fragment key={ele.id}>
            <LI onClick={()=>{subSelect(ele)}}>{ele.sub_category_name}</LI>
        </React.Fragment>
    )
    return(
        <CategoryWrapper>
            <H3>전체 카테고리</H3>
            {CategoryType.map((ele,key)=>
            <React.Fragment key={ele.id}>
                <Ul>
                    <Line></Line>
                    <Subject onClick={()=>{handleList(ele),subSelect(ele)}}>{ele.category_name}</Subject>
                    <Line></Line>
                </Ul>
                {List==key
                    ?
                        <>
                            {/* <LI>

                            </LI>  */}
                            {subCategory}
                        </>
                    :
                         <li></li>
                }
            </React.Fragment>
             )}
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