import BackBtn from '../../components/common/BackBtn'
import NFTPic from '../../components/view/NFTPic'
import NFTdetail from '../../components/view/sell/NFTdetail'
import {useRouter} from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { directDealView_REQUEST } from '../../reducers/view'
import { useEffect, useState } from 'react'

const View = ({children}) => {
    return (
        <>
            <BackBtn />
            <NFTPic />
            <NFTdetail >
                구매하기
            </NFTdetail>

        </>
    )
}

export default View