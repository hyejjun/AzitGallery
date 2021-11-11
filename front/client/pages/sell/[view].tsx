import BackBtn from '../../components/common/BackBtn'
import NFTPic from '../../components/view/NFTPic'
import NFTdetail from '../../components/view/sell/NFTdetail'
import {useRouter} from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { directDealView_REQUEST } from '../../reducers/view'
import { useEffect, useState } from 'react'

const View = ({children}) => {

    // const router = useRouter()
    // const {view} = router.query // 카테고리 이름
    // console.log(view);
    
    
    // const dispatch = useDispatch()
    
    // useEffect(()=>{
    //     dispatch(directDealView_REQUEST(view))
    // },[])




    return (
        <>
            <BackBtn />
            <NFTPic />
            <NFTdetail>
                구매하기
            </NFTdetail>

        </>
    )
}

export default View