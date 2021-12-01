import React, { useEffect, useState } from "react";
import Head from "next/head";
import ItemList from '../components/list/ItemList'
import Link from 'next/link'
import Styled from 'styled-components'


export default function Home() {

  return (
    <>
    <div className="container">
      <div>
        <div><ItemList /></div>
      </div>
    </div>
    </>
  );
}

const Mobile = Styled.div`
@media screen and (max-width : 1095px) {
display:none;    
}

`