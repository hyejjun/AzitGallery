import Styled from 'styled-components'
import { RootState } from "../../reducers";
import { useSelector } from 'react-redux';


const QtySelect = (props) => {
    const selected = useSelector((state:RootState) => state.view.selected);
    const qtydata = useSelector((state:RootState) => state.view.qtydata);
    const optionArr = [...props.qtyArr]
    optionArr.unshift('QTY')
    let QtyList = optionArr.map((v,k)=>{
        return(
            <option value={v} key={k}>
                {v}
            </option>
        )
    })
    const handleChange = (e) => {
        selected.qty = e.target.value
        props.flagsetqty(e.target.value)
    }
    const onClick = () => {

        if(selected.size==''&&selected.color==''){
            alert('색상과 사이즈를 모두 선택해주세요')
        }else if(selected.size==''){
            alert('사이즈를 선택해주세요')
        }else if(selected.color==''){
            alert('색상을 선택해주세요')
        }
        if(qtydata.length==0){
            alert('색상과 사이즈에 일치하는 상품의 수량이 모두 소진되었습니다.')
        }

    }
    return(
        <QtySelectCSS value={props.flagqty} onChange={handleChange} onClick={onClick}>
            {QtyList}
        </QtySelectCSS>
        
    )

}
export default QtySelect

const QtySelectCSS = Styled.select`
    margin-right:10px;
    width:100px;
    font-size:22px;
    border: 1px solid #aab4be;
    border-radius : 4px;

    &:focus {
        outline: none;
    }
`