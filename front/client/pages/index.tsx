import React, { useState } from "react";
import Head from "next/head";
import ItemList from '../components/list/ItemList'
import Link from 'next/link'

export default function Home() {

  const TOKEN = ()=> {
    //토큰 1회 발행
    window.caver.klay.KIP7.deploy({
      name: 'EPITEOMBLACKBLUE',
      symbol: 'EPI',
      decimals: 18,
      initialSupply: '10000000000000000000000',
    }, '0xFeA30a06828cfC5CE4Db8D90F2F4ac20C7937019')
    .on('error', function(error) { console.log(error) })
    .on('transactionHash', function(transactionHash) { console.log(transactionHash)})
    .on('receipt', function(receipt) {
        console.log(receipt.contractAddress) // contains the new token contract address
    })
    .then(function(newKIP7Instance) {
        console.log(newKIP7Instance.options.address) // instance with the new token contract address
    })
  }

  return (
    <>
    <div className="container">
      <div>
        <div onClick = {TOKEN}>토큰 임시</div>
        <div><ItemList /></div>
      </div>
    </div>
    </>
  );
}