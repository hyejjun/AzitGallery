import Styled from 'styled-components'
import { RootState } from "../../reducers";
import { useSelector } from 'react-redux';

const ColorSelect = (props) => {
    const selected = useSelector((state:RootState) => state.view.selected);
    const optionArr = [...props.colorArr]
    optionArr.unshift('COLOR')
    let colorList = optionArr.map((v,k)=>{
        return(
            <option value={v} key={k}>
                {v}
            </option>
        )
    })
    const handleChange = (e) =>{
        selected.color = e.target.value
        props.flagsetcolor(e.target.value)
    }
    return (
        <ColorSelectCSS value={props.flagcolor} onChange={handleChange}>            
            {colorList}
        </ColorSelectCSS>
    )
}
export default ColorSelect


const ColorSelectCSS = Styled.select`
    margin-right:10px;
    width:100px;
    font-size:22px;
    border: 1px solid #aab4be;
    border-radius : 4px;

    &:focus {
        outline: none;
    }
`
