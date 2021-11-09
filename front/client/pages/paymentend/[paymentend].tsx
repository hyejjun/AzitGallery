import React, { useState } from "react";
import PaymentFinish from '../../components/shipping/PaymentFinish'
import {useRouter} from 'next/router'

const paymentend = () => { 
  const router = useRouter()
  const {view} = router.query // 카테고리 이름
  return (
    <div className="container">
      <div>

        <div><PaymentFinish /></div>
      </div>
    </div>
  );
}

export default paymentend
