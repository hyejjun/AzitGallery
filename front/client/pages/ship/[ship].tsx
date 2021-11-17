import React, { useState } from "react";
import {useRouter} from 'next/router'
import Shippingform from '../../components/shipping/Shippingform'


const Ship = () => {  
  const router = useRouter()
  const {view} = router.query // 카테고리 이름
  return (
    <div className="container">
      <div>
        <div><Shippingform /></div>
      </div>
    </div>
  );
}

export default Ship