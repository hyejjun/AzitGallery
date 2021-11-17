import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import DeliveryForm from "./DeliveryForm";
import { delivery_customer_REQUEST } from "../../reducers/ship"
import { RootState } from "../../reducers"

const OrderInfo = () => {
    const User = useSelector((state:RootState) => state.user);
    const Ship = useSelector((state:RootState) => state.ship);
    const dispatch = useDispatch()
    const useridx = {
        useridx:User.UserAddress
    }
    useEffect(()=>{ 
        dispatch(delivery_customer_REQUEST(useridx))
    },[])

    return(
        <>
            <DeliveryForm>
                <h3>주문자 정보</h3>
                <p></p>
                    <table>
                        <tbody>
                            <tr>
                                <td>주문하신 분</td>
                                <td>{Ship.DeliveryArr[0].buyer}</td>
                            </tr>
                            <tr>
                                <td>받으시는 분</td>
                                <td>{Ship.DeliveryArr[0].receiver}</td>
                            </tr>
                            <tr>
                                <td>배송주소</td>
                                <td>
                                    {Ship.DeliveryArr[0].receiver_address}
                                </td>
                            </tr>
                            <tr>
                                <td>휴대번호</td>
                                <td>
                                    {Ship.DeliveryArr[0].receiver_contact}
                                </td>
                            </tr>
                            <tr>
                                <td>배송메세지</td>
                                <td>
                                    {Ship.DeliveryArr[0].memo}
                                </td>
                            </tr> 
                        </tbody>
                    </table>

                </DeliveryForm>
        </>
    )
}

export default OrderInfo