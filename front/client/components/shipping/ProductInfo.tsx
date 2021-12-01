import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import DeliveryForm from "./DeliveryForm";
import { delivery_customer_REQUEST } from "../../reducers/ship"
import { RootState } from "../../reducers"

const ProductInfo = () => {
    const User = useSelector((state:RootState) => state.user);
    const Ship = useSelector((state:RootState) => state.ship.DeliveryArr);
    
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
                                <td>{Ship[0].title}</td>
                            </tr>
                            <tr>
                                <td>상품 가격</td>
                                <td>{Ship[0].total_price}</td>
                            </tr>
                            <tr>
                                <td>총 주문금액</td>
                                <td> 상품가격 {Ship[0].total_price} klay</td>
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