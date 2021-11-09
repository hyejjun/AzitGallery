import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import DeliveryForm from "./deliveryForm";
import { delivery_customer_REQUEST } from "../../reducers/ship"
import { RootState } from "../../reducers"

const ProductInfo = () => {
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
                <h3>상품 정보</h3>
                <p></p>
                    <table>
                        <tbody>
                            <tr>
                                <td>상품명</td>
                                <td>{Ship.DeliveryArr[0].item_code}</td>
                            </tr>
                            <tr>
                                <td>상품 가격</td>
                                <td>{Ship.DeliveryArr[0].total_price}원</td>
                            </tr>
                            <tr>
                                <td>총 주문금액</td>
                                <td>{Number(Ship.DeliveryArr[0].total_price) + Number(3000)} 원 (상품가격 {Ship.DeliveryArr[0].total_price}원 + 배송료 3000원)</td>
                            </tr>
                            <tr>
                                <td>결제 방법</td>
                                <td>kaikas</td>
                            </tr>
                        </tbody>
                    </table>

                </DeliveryForm>
        </>
    )
}

export default ProductInfo