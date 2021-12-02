import Styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { SellerAdminAccess_REQUEST } from '../../reducers/user'
import { SellerAdminDeny_REQUEST } from '../../reducers/user'
import { Userlist_REQUEST } from '../../reducers/user'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../reducers"

const Approvecomponent = () => {

    const user = useSelector((state: RootState) => state.user);
    const userList = useSelector((state: RootState) => state.user.userList);
    const dispatch = useDispatch()
    const [Arr, setArr] = useState([])

    useEffect(() => {
        dispatch(Userlist_REQUEST())
        setArr(user.userList)
    }, [])

    const nameList: JSX.Element[] = userList.map((ele, id) => {

        const ArrID = `Arr${String(id + 1)}`

        const PullArr = () => {

            var result = confirm("kyc 인증을 하겠습니까? \n 승인 => 확인 \n 반려 => 취소 를 눌러주세요");
            if (result) {
                alert("인증되었습니다");
                document.querySelector(`.${ArrID}`).innerHTML = '승인됨'
                dispatch(SellerAdminAccess_REQUEST(ele.user_idx))
            } else {
                alert("반려되었습니다");
                document.querySelector(`.${ArrID}`).innerHTML = '반려됨'
                dispatch(SellerAdminDeny_REQUEST(ele.user_idx))
            }
        }

        return (
            <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.nick_name}</td>
                {
                    ele.admin_approval == 3
                        ? <td className={`Arr${ele.id}`}>승인됨</td>
                        : (
                            ele.admin_approval == 2
                                ? <td className={`Arr${ele.id}`}>반려됨</td>
                                : (
                                    ele.admin_approval == 1
                                        ? <td className={`Arr${ele.id}`}>대기중</td>
                                        : <td className={`Arr${ele.id}`}>미신청</td>
                                )
                        )
                }

                <td><BTN onClick={PullArr}>승인</BTN></td>
            </tr>
        )
    })
    return (
        <>
            <AdminApproveWrap>
                <Table>
                    <tbody>
                        <tr>
                            <TdHead>순번</TdHead>
                            <TdHead>닉네임</TdHead>
                            <TdHead>승인상태</TdHead>
                            <TdHead>승인확인</TdHead>
                        </tr>
                        {nameList}
                    </tbody>

                </Table>
            </AdminApproveWrap>
        </>
    )
}

export default Approvecomponent

const AdminApproveWrap = Styled.div`
    height : 50vh;  
`

const Table = Styled.table`
    width:800px;
    
    margin:0 auto;
    font-size:20px;
    text-align:center;
    line-height:80px;
    margin-top:100px;
    margin-bottom:100px;
`
const TdHead = Styled.td`
    font-weight:bold;
    font-size:25px;
`

const BTN = Styled.div`
    font-size:20px;
    font-weight:bold;
    border:1px solid #bbb;
    width:80px;
    margin:0 auto;
    height:30px;
    text-align:center;
    padding:0px 0px 50px 0px;
    &:hover{
        color:white;
        background:#bbb;
    }
    cursor : pointer;

`
