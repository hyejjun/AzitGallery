import React, { useEffect, useState } from "react";
import Head from "next/head";
import ItemList from '../components/list/ItemList'
import Link from 'next/link'
import Styled from 'styled-components'


export default function Home() {

  // const TOKEN = ()=> {
  //   //토큰 1회 발행
  //   window.caver.klay.KIP7.deploy({
  //     name: 'HALLOWEENPUMKIN',
  //     symbol: 'HPM',
  //     decimals: 18,
  //     initialSupply: '10000000000000000000000',
  //   }, '0x38b17d214cA56AC881C27baD796aa78f1afB44d7')
  //   .on('error', function(error) { console.log(error) })
  //   .on('transactionHash', function(transactionHash) { console.log(transactionHash)})
  //   .on('receipt', function(receipt) {
  //       console.log(receipt.contractAddress) // contains the new token contract address
  //   })
  //   .then(function(newKIP7Instance) {
  //       console.log(newKIP7Instance.options.address) // instance with the new token contract address
  //   })
  // }



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