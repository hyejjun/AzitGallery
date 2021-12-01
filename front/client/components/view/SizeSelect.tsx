import Styled from 'styled-components'
import { RootState } from "../../reducers";
import { useSelector, useDispatch } from 'react-redux';
import { select } from '@redux-saga/core/effects';
import { getMatchQty_REQUEST } from '../../reducers/view'

const SizeSelect = (props) => {
    const dispatch = useDispatch()
    const selected = useSelector((state:RootState) => state.view.selected);
    const item_id = useSelector((state:RootState) => state.view.directIdx);
    const qtydata = useSelector((state:RootState) => state.view.qtydata);

    const optionArr = [...props.sizeArr]
    optionArr.unshift('SIZE')

    let sizeList = optionArr.map((v,k)=>{
        return(
            <option value={v} key={k}>
                {v}
            </option>
        )
    })   

    const handleChange = (e) =>{
        selected.size = e.target.value
        props.flagsetsize(e.target.value)
        dispatch(getMatchQty_REQUEST({selected,item_id}))  
    } 

    const onClick = () => {
        if(selected.color == ''){
            alert('색상을 먼저 선택해주세요')
        }
    }


    return (
        <SizeSelectCSS value={props.flagsize} onChange={handleChange} onClick={onClick}>
            {sizeList}
        </SizeSelectCSS>
    )
}
export default SizeSelect


const SizeSelectCSS = Styled.select`
    margin-right:10px;
    width:72px;
    font-size:22px;
    border: 1px solid #aab4be;
    border-radius : 4px;

    &:focus {
        outline: none;
    }
`
