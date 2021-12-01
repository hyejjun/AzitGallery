import Styled from 'styled-components'
import ModalForm from '../../components/common/ModalForm'
import ModalBackground from '../../components/common/ModalBackground'
import useInput from '../../hooks/useInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers';

const Waybill = (props) => {
    const code = useSelector((state:RootState)=>state.ship)
    const { setClose, deliveryCompnay, deliveryNum, onChangeDeliveryNum, img } = props



    return (
        <>
            <ModalBackground>
                <ModalForm>
                    <WaybillForm>
                        <ul>
                            <li className="productName">상품명</li>
                            <li className="productPic">
                                <img alt="상품사진" src={props.img} />
                            </li>
                            <li className="company">택배사</li>
                            <li className="companySelect">
                                <select title="택배사 선택" defaultValue="default" name="deliveryCompany" id="deliveryCompany" onChange={deliveryCompnay}>
                                    <option value="default" disabled>택배사 선택</option>
                                    <option value="CJ대한통운">CJ대한통운</option>
                                    <option value="우체국택배">우체국택배</option>
                                    <option value="한진택배">한진택배</option>
                                    <option value="롯데택배">롯데택배</option>tt
                                    <option value="로젠택배">로젠택배</option>
                                    <option value="편의점택배(GS25)">CVSnet 편의점택배(GS25)</option>
                                </select>
                            </li>
                            <li className="number">운송장</li>
                            <li className="numberInput">
                                <input type="text" placeholder="운송장 번호 - 없이 입력" value={deliveryNum} onChange={onChangeDeliveryNum} />
                            </li>
                        </ul>
                        <SetForm onClick={setClose}>운송장 등록</SetForm>
                    </WaybillForm>
                </ModalForm>
            </ModalBackground>
        </>
    )
}

export default Waybill


const WaybillForm = Styled.div`
    width: 100%;
    height: 350px;

    & > ul{
        padding : 0;
        margin : 0;
    }

    .productName{
        font-size: 20px;
        font-weight: bold;
        height: 40px;
    }

    .productPic{
        width : 100%;
        height: 170px;
        margin-bottom : 30px;
        & > img {
            width: 60%;
            height: 100%;
            display: block;
            background: aquamarine;
            margin: 0 auto;
        }
    }

    .company, 
    .number
    {
        text-align: left;
        width: 20%;
        float: left;
        cursor : default;
    }

    .companySelect,
    .numberInput
    {
        width : 80%;
        display : inline-block;
        margin-bottom: 20px;
    }
    .numberInput{
        margin-bottom: 30px;
    }

    .numberInput > input {
        width: 79%;
    }

    .companySelect > select:focus,
    .numberInput > input:focus {
        outline :none;
    }
`


const SetForm = Styled.button`
    cursor : pointer;
    float: right;
`