import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import DeliveryForm from "./DeliveryForm";
import { delivery_customer_REQUEST } from "../../reducers/ship"
import { RootState } from "../../reducers"

const OrderInfo = () => {
    const User = useSelector((state:RootState) => state.user);
    const Ship = useSelector((state:RootState) => state.ship);
    const deliveryinfo = useSelector((state:RootState) => state.ship.DeliveryArr)  

    const dispatch = useDispatch()

    




    let linkdata = Ship.itemcode

    useEffect(()=>{ 
        if(params[0]=='a'){
            dispatch(delivery_customer_REQUEST(data))
        }else{
            dispatch(delivery_customer_REQUEST(data))
        }
    },[linkdata])

    let params = window.location.href.split('d/')[1]
    Ship.itemcode = params 
    const data = {
        useridx:User.UserAddress,
        params:Ship.itemcode
    }

    return(
        <>
            <DeliveryForm>
                <h3>주문자 정보</h3>
                <p></p>
                    <table>
                        <tbody>
                            <tr>
                                <td>주문하신 분</td>
                                <td>{deliveryinfo[0].username}</td>
                            </tr>
                            <tr>
                                <td>받으시는 분</td>
                                <td>{deliveryinfo[0].receiver}</td>
                            </tr>
                            <tr>
                                <td>배송주소</td>
                                <td>
                                    {deliveryinfo[0].receiver_address}
                                </td>
                            </tr>
                            <tr>
                                <td>휴대번호</td>
                                <td>
                                    {deliveryinfo[0].receiver_contact}
                                </td>
                            </tr>
                            <tr>
                                <td>배송메세지</td>
                                <td>
                                    {deliveryinfo[0].memo}
                                </td>
                            </tr> 
                        </tbody>
                    </table>

                </DeliveryForm>
        </>
    )
}

export default OrderInfo