import NFTexplanation from "../NFTexplanation"
import NFTTitle from "../NFTTitle"
import AuctionDetail from "./AuctionDetail"
import { useSelector } from "react-redux"
import { RootState } from "../../../reducers"

const NFTAuction = () => {

    const nickname = useSelector((state:RootState) => state.view.nick_name);
    const title = useSelector((state:RootState) => state.view.title);
    const description = useSelector((state:RootState) => state.view.description);
    const bid_price = useSelector((state:RootState) => state.view.bid_price);
    const currency = useSelector((state:RootState) => state.view.currency);
    const left_time = useSelector((state:RootState) => state.view.left_time);

    return (
        <>
            <NFTTitle title={title}/>
            <AuctionDetail bid_price={bid_price} currency={currency} left_time={left_time}/>
            <NFTexplanation nickname={nickname} description={description}/>
        </>
    )
}

export default NFTAuction