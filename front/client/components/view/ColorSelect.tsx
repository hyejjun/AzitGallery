import Styled from 'styled-components'

const ColorSelect = (props) => {
    const optionArr = [...props.colorArr]
    let colorList = optionArr.map((v,k)=>{
        return(
            <option key={k}>
                {v}
            </option>
        )
    })    
    return (
        <ColorSelectCSS>
            <option>
                Color
            </option>
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
