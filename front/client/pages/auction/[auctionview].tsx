import BackBtn from "../../components/common/BackBtn"
import NFTPic from "../../components/view/NFTPic"
import NFTAuction from "../../components/view/auction/NFTAuction"
import {useRouter} from 'next/router'
import { auctionView_REQUEST } from "../../reducers/view"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"


const AuctionView = () =>{
    const router = useRouter()
    const {auctionview} = router.query // 카테고리 이름
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(auctionView_REQUEST(auctionview))
    },[])

    return(
        <>
            <BackBtn/>
            <NFTPic/>
            <NFTAuction/>
        </>
    )
}

export default AuctionView