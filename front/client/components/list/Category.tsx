import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { RootState } from "../../reducers"
import { all_category_REQUEST,sub_category_list_REQUEST,main_all_direct_REQUEST } from '../../reducers/main'


const Category = (props) => {

    const dispatch = useDispatch()
    const Main = useSelector((state:RootState) => state.main);
    const CategoryType = Main.categoryList
    const SubType = Main.subList
    const [List, setList] = useState<number>(-1);

    useEffect(()=>{
        dispatch(all_category_REQUEST())
    },[])

    let sendData = {
        sell_type:props.sell_type,
        list_length:3,
        list:Main.listId
    }

    useEffect(()=>{
        dispatch(main_all_direct_REQUEST(sendData))
    },[Main.listId])
    
    const handleList = (e) => {
        if(e.id-1==List){
            setList(-1)
        }else{
            setList(e.id-1)
        }
        dispatch(sub_category_list_REQUEST(e.id))
        dispatch(main_all_direct_REQUEST(sendData))
    }
    const subSelect = (e) => {
        sendData = {
            sell_type:props.sell_type,
            list_length:3,
            list:e.item_code
        }
        dispatch(main_all_direct_REQUEST(sendData))
    }


    const subCategory:any = SubType.map((ele,key)=>
        <React.Fragment key={ele.id}>
            <LI onClick={()=>{subSelect(ele)}}>{ele.sub_category_name}</LI>
        </React.Fragment>
    )

    return(
        <CategoryWrapper>
            {/* <H3>카테고리</H3> */}
            {CategoryType.map((ele,key)=>
            <React.Fragment key={ele.id}>
                <Ul>
                    <Line></Line>
                    <Subject onClick={()=>{handleList(ele)}}>{ele.category_name}</Subject>
                    <Line></Line>
                </Ul>
                {List==key
                    ?
                        <>
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
    font-size: 19px;
    margin-bottom: 8px;
    cursor: pointer;
    font-weight: bold;
    height: 45px;
    border-bottom: 1px solid #e8e8e9;
    color: #2d3741;
}
`

const Line = Styled.li`
    height:2px;
    /* background:#bbb; */
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