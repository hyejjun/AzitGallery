import React, { useState, useEffect } from "react";
import Styled from 'styled-components'
import Order from "./Order";
import NFTexplanation from "../NFTexplanation";
import Like from "../../common/Like";
import NFTTitle from "../NFTTitle";
import SizeSelect from "../SizeSelect";
import ColorSelect from "../ColorSelect";
import { RootState } from "../../../reducers";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { directDealView_REQUEST } from '../../../reducers/view'
import { likeInsert_REQUEST, likeList_REQUEST } from "../../../reducers/like";


const NFTdetail = ({ children }) => {
    const User = useSelector((state:RootState) => state.user);    

    useEffect(() => {
        
        let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")

        dispatch(directDealView_REQUEST(params))
        dispatch(likeList_REQUEST(userIdx))
        dispatch(likeInsert_REQUEST(data))

        console.log(likeList, params);

        const testInterval = setInterval(function() {
            console.log("2초마다 반복 실행됩니다.");
            checkLikeStatus()

        },2000);
        
        setTimeout(function() {
            clearTimeout(testInterval);
        },7000);


    }, [])

    const [colorpic, setColor] = useState<string>('')
    const [sizepic, setSize] = useState<string>('')

    const dispatch = useDispatch()
   

    const [open, setOpen] = useState<boolean>(false);
    const orderOpen = () => {
        if(User.UserAddress !== 'kaikasAddress'){
            setOpen(prev => !prev)
        }else {
            alert('로그인 해주세요')
        }
        
    }

    const nickname = useSelector((state: RootState) => state.view.nick_name);
    const title = useSelector((state: RootState) => state.view.title);
    const description = useSelector((state: RootState) => state.view.description);
    const color = useSelector((state: RootState) => state.view.color);
    const size = useSelector((state: RootState) => state.view.size);
    const price = useSelector((state: RootState) => state.view.price);
    const currency = useSelector((state: RootState) => state.view.currency);
    const item_img_link = useSelector((state: RootState) => state.view.item_img_link);

    const colorArr = color.split(",")
    const sizeArr = size.split(",")

    /* 좋아요 부분 */
    const likeStatus = useSelector((state: RootState) => state.like.likeStatus)
    const likeBool = useSelector((state: RootState) => state.like.likeBool)
    const itemIdx = useSelector((state: RootState) => state.like.itemIdx)
    const likeList = useSelector((state: RootState) => state.like.likeList)

    // console.log(likeList);



    const router = useRouter()
    const { view } = router.query

    const [like, setLike] = useState<boolean>(false);

    const doLike = () => {
        setLike(prev => !prev)
        setLikeState(prev=>!prev)
        dispatch(likeInsert_REQUEST(data))
    }

    const userIdx = useSelector((state: RootState) => state.user.userIdx);

    useEffect(() => {
<<<<<<< HEAD
        dispatch(likeInsert_REQUEST(data))
        dispatch(likeList_REQUEST(userIdx))

=======
        // dispatch(likeInsert_REQUEST(data))
        // dispatch(likeList_REQUEST(userIdx))
>>>>>>> fbb3832355c0c054f472154a7c1fb1d09fc8e750
    }, [like])

    const [likeState,setLikeState] = useState<boolean>(false);

    useEffect(()=>{
        checkLikeStatus()
    },[likeList])

    const checkLikeStatus = () => {
<<<<<<< HEAD
        let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")

        console.log(likeList, params);
        
=======
>>>>>>> fbb3832355c0c054f472154a7c1fb1d09fc8e750
        for (let i = 0; i < likeList.length; i++) {
            if (likeList[i].toString() === params) {
                console.log('일치함');
                setLikeState(true)
                console.log("일치 한다면 ==== ",likeState);
            } else {
                setLikeState(false)
            }
        }
    }

    // console.log(likeState);
    
    let data = {
        view,
        userIdx,
        like,
        likeState
    }
    

<<<<<<< HEAD
    let params = JSON.stringify(window.location.href).split('ell/')[1].replace("\"", "")
=======
    useEffect(() => {
        dispatch(directDealView_REQUEST(params))
        dispatch(likeList_REQUEST(userIdx))
        

>>>>>>> fbb3832355c0c054f472154a7c1fb1d09fc8e750


    return (
        <>
            <NFTdetailWrap>
                <NFTBuy>
                    <ColorSelect colorArr={colorArr} flagsetcolor={setColor} flagcolor={colorpic} />
                    <SizeSelect sizeArr={sizeArr} flagsetsize={setSize} flagsize={sizepic} />
                    <Like like={like} doLike={doLike} likeStatus={likeStatus} likeList={likeList} params={params} likeState={likeState}/>
                    <BuyBtnCSS onClick={orderOpen}>
                        <button>{children}</button>
                    </BuyBtnCSS>
                    <Order open={open} orderOpen={orderOpen} price={price} currency={currency} flagcolor={colorpic} flagsize={sizepic} item_id={params} />
                </NFTBuy>
                <NFTTitle title={title} />
                <NFTexplanation nickname={nickname} description={description} />
            </NFTdetailWrap>
        </>
    )
}
export default NFTdetail

const NFTdetailWrap = Styled.div`
    width : 100%;
    height : auto;
    margin-top: 5%;
`

const NFTBuy = Styled.div`
    
    width: 100%;
    height: 60px;
    display: flex;
    padding-left: 50%;
    box-sizing: border-box;

`

export const BuyBtnCSS = Styled.span`
    width: 246px;
    height : 60px;
    margin-left: 3%;
    
    & > button {
        width : 100%;
        height : 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        padding: 12px 20px;
        background-color: rgb(32, 129, 226);
        border: 1px solid rgb(32, 129, 226);
        color: rgb(255, 255, 255);
        cursor: pointer;
    }

`
export const EndBtnCSS = Styled.span`
    width: 246px;
    height : 60px;
    margin-left: 3%;
    
    & > button {
        width : 100%;
        height : 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        padding: 12px 20px;
        background-color: #bbb;
        border: 1px solid white;
        color: white;
        cursor: pointer;
    }

`