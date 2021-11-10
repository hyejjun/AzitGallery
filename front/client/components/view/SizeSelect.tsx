import Styled from 'styled-components'

const SizeSelect = (props) => {
    const optionArr = [...props.sizeArr]
    let sizeList = optionArr.map((v,k)=>{
        return(
            <option key={k}>
                {v}
            </option>
        )
    })    
    return (
        <SizeSelectCSS>
            <option>
                SIZE
            </option>
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
