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

    const colorArr = color.split(",")
    const sizeArr = size.split(",")

    return (
        <>
            <NFTTitle title={title}/>
            <AuctionDetail />
            <NFTexplanation nickname={nickname} description={description}/>
        </>
    )
}

export default NFTAuction