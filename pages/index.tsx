import React, { useEffect, useState, useRef } from "react";
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
      <Head>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script>
          {`var googletag = googletag || {};
             googletag.cmd = googletag.cmd || [];`}
        </script>
      </Head>
      <button onClick={() => router.push(`/chat/${1}`)}>1회차 클릭</button>
      <button onClick={() => router.push(`/chat/${2}`)}>2회차 클릭</button>
      <button onClick={() => router.push(`/chat/${3}`)}>3회차 클릭</button>
      <button onClick={() => router.push(`/chat/${4}`)}>4회차 클릭</button>
    </>
  );
};

export default Home;
