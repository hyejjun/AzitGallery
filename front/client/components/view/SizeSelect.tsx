import Styled from 'styled-components'
import { RootState } from "../../reducers";
import { useSelector } from 'react-redux';
import { select } from '@redux-saga/core/effects';

const SizeSelect = (props) => {
    const selected = useSelector((state:RootState) => state.view.selected);
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
    } 
    console.log(selected)

    return (
        <SizeSelectCSS value={props.flagsize} onChange={handleChange}>
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
