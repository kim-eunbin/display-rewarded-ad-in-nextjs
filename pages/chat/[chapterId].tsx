import React, { useState } from "react";
import Ad from "../../components/Advertisement";
import Head from "next/head";

const ChatPage = () => {
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

export default ChatPage;
