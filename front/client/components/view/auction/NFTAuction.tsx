import NFTexplanation from "../NFTexplanation"
import NFTTitle from "../NFTTitle"
import AuctionDetail from "./AuctionDetail"
import { useSelector } from "react-redux"
import { RootState } from "../../../reducers"

const NFTAuction = () => {

    const nickname = useSelector((state:RootState) => state.view.nick_name);
    const title = useSelector((state:RootState) => state.view.title);
    const description = useSelector((state:RootState) => state.view.description);
    const color = useSelector((state:RootState) => state.view.color);
    const size = useSelector((state:RootState) => state.view.size);
    const bid_price = useSelector((state:RootState) => state.view.bid_price);
    const currency = useSelector((state:RootState) => state.view.currency);
    const left_time = useSelector((state:RootState) => state.view.left_time);

    const colorArr = color.split(",")
    const sizeArr = size.split(",")

    return (
        <>
            <NFTTitle title={title}/>
            <AuctionDetail bid_price={bid_price} currency={currency} left_time={left_time} nickname={nickname}/>
            <NFTexplanation nickname={nickname} description={description}/>
        </>
    )
}

export default NFTAuction