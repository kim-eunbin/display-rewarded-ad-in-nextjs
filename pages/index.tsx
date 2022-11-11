import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import Ad from "../components/Advertisement";

declare global {
  interface Window {
    googletag: any;
  }
}

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <>loading...</>;
  }

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
      <Ad setIsLoading={setIsLoading} />
    </>
  );
};

export default Home;
