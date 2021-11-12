import Styled from 'styled-components'

const SizeSelect = (props) => {
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
        props.flagsetsize(e.target.value)
    } 
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
