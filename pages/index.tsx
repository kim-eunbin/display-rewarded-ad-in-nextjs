import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

declare global {
  interface Window {
    googletag: any;
  }
}

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <h1>작품 상세화면</h1>
      <button onClick={() => router.push(`/chat/${1}`)}>1회차</button>
      <button onClick={() => router.push(`/chat/${2}`)}>2회차</button>
      <button onClick={() => router.push(`/chat/${3}`)}>3회차</button>
      <button onClick={() => router.push(`/chat/${4}`)}>4회차</button>
    </>
  );
};

export default Home;
