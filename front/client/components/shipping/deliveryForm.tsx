import Styled from 'styled-components'

const DeliveryForm = ({children}) => {
    return(
        < DeliverFromWrapper>
                {children}
        </ DeliverFromWrapper>
    )
}

export default DeliveryForm

const DeliverFromWrapper = Styled.div`
    width:60%;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    margin-top:20px;
    margin-left:230px;
    p{
        width:668px;
        height:3px;
        margin-top:13px;
        background-color:black;
    }
    table{
        margin-top:20px;
        padding:0px 13px 13px 13px;
        vertical-align:middle;
        text-align:center;
        background-color:#f8f9fa;
        border-radius:2%;
    }
    table >tbody>tr>td{
        padding-top:17px;
        padding-bottom:10px;
        border-bottom:1px solid black;
    }
    table >tbody>tr>td :nth-child(1){
        font-size:17px;
        font-weight:550;
        color:#343a40;

    }
`
