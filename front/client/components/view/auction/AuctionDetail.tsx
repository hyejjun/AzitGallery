import Styled from 'styled-components'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BuyBtnCSS } from '../sell/NFTdetail';
import { EndBtnCSS } from '../sell/NFTdetail';
import JoinAcution from './JoinAuction';
import { Auction_Price_REQUEST } from "../../../reducers/auction"
import { Auction_Current_REQUEST, AuctionClose_REQUEST } from "../../../reducers/auction"
import { RootState } from "../../../reducers"

const AuctionDetail = (props) => {
    const dispatch = useDispatch()
    const User = useSelector((state: RootState) => state.user);
    const Auction = useSelector((state: RootState) => state.auction);
    const view = useSelector((state: RootState) => state.view);
    const [num, setNum] = useState<number>(5);
    const [price, setPrice] = useState<number>(0);

    const [limitTime, setlimitTime] = useState<number>(5);
    const [endBool, setEndBool] = useState<Boolean>(false);
    const [openAuction, setOpenAuction] = useState<boolean>(false);
    const auctionOpen = () => {
        setOpenAuction(prev => !prev)
    }

    /* props로 전달할 값 */
    const [auctionPrice, setAuctionPrice] = useState<number>(0);
    const priceChange = (e) => {
        setAuctionPrice(e.target.value)
    }

    const maxPrice = 0.6;           // useSelector 로 maxprice
    const yourBalance = 0.7;        // 이걸 나중에 useSelector 로 가져올거임
    const [balacne, setBalance] = useState<number>(0);
    const [balanceCheck, setBalanceCheck] = useState<boolean>(false);       // 잔액확인

    useEffect(() => {
        setBalance(yourBalance)
    }, [])

    const lowBalance = () => {
        if (Number(auctionPrice) <= Number(Auction.current)) {
            alert('현재가보다 높게 제시해주세요')
            setOpenAuction(prev => !prev)
        } else {
            let params = JSON.stringify(window.location.href).split('ion/')[1].replace("\"", "")
            let data = {
                params: params,
                user: User.UserAddress,
                price: auctionPrice,
                prevWallet : Auction.prevWallet,
                prevAmount : Auction.prevAmount,
            }

            window.caver.klay
                .sendTransaction({
                    type: 'VALUE_TRANSFER',
                    from: window.klaytn.selectedAddress,
                    to: '0x62B8769D6eDc718d90CB8884cA7F390e9b9C7466',
                    value: window.caver.utils.toPeb(`${auctionPrice}`, 'KLAY'),
                    gas: 8000000
                })
                .once('transactionHash', transactionHash => {
                    console.log('txHash', transactionHash)

                    dispatch(Auction_Price_REQUEST(data))
                    alert('입찰 되셨습니다!')
                    setOpenAuction(prev => !prev)
                })
                .once('receipt', receipt => {
                    // console.log('receipt', receipt)
                })
                .once('error', error => {
                    console.log('error', error)
                    alert('결제 에러 발생')
                })


            let data2 = {
                params: params,
            }
            dispatch(Auction_Current_REQUEST(data2))
        }
    }

    useEffect(() => {
        let params = JSON.stringify(window.location.href).split('ion/')[1].replace("\"", "")
        let data = {
            params: params,
        }
        dispatch(Auction_Current_REQUEST(data))        
    }, [])


    const auctionValue = {
        maxPrice,
        yourBalance,
        setAuctionPrice,
        priceChange,
        setBalance,
        setBalanceCheck,
        lowBalance,
        auctionPrice
    }

    return (
        <>
            <AuctionDetailWrap>
                <ul className="auctionTitle">
                    {/* <li>경매 입찰 수</li> */}
                    <li>현재 입찰가</li>
                    <li>마감시간</li>
                </ul>
                <ul className="auctionContent">
                    {/* <li>{num}</li> */}
                    <li>{Auction.current}KLAY</li>
                    <li>{view.kr_end_date}</li>
                </ul>
                <BtnWrap>
                    { view.sellerKaikasAddress !== window.klaytn.selectedAddress
                        ?
                        <BuyBtnCSS className="auctionBtn" onClick={auctionOpen}>
                            <button>경매 참여</button>
                        </BuyBtnCSS>
                        :
                        <EndBtnCSS className="auctionBtn">
                            <button>경매 불가</button>
                        </EndBtnCSS>}
                    <JoinAcution openAuction={openAuction} auctionOpen={auctionOpen} auctionValue={auctionValue} bid_price={props.bid_price} />
                </BtnWrap>
            </AuctionDetailWrap>
        </>
    )
}

export default AuctionDetail


const AuctionDetailWrap = Styled.div`
    height: 200px;
    padding: 3% 0;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid rgba(20,30,40,0.1);

    .auctionTitle{
        & > li {
            width: 150px;
            height : 50px;
            font-size : 20px;
            font-weight : bold;
        }
    }

    .auctionContent{
        & > li {
            width: 400px;
            height : 50px;
            font-size : 20px;
            font-weight : bold;
        }
    }
`

const BtnWrap = Styled.div`
    width: 200px;
    height: 100px;
    margin-left: 33%;

    .auctionBtn{

    }

    .auctionBtn > button{
        font-size : 20px;
    }


`