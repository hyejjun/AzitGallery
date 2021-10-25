import React, { useState } from "react";
import Head from "next/head";
import ItemList from './components/list/ItemList'
import Link from 'next/link'


export default function Home() {

  return (
    <>
    <Link href="/SignUp">임시 회원가입</Link>
    <div className="container">
      <div>

        <div><ItemList /></div>
      </div>
    </div>
    </>
  );
}