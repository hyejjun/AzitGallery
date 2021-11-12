import Styled from 'styled-components'

const ColorSelect = (props) => {
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
