import React, { useEffect, useState } from "react";
import Ad from "../../components/Advertisement";
import Head from "next/head";
import Router, { useRouter } from "next/router";

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const startTransition = () => {
      const { googletag } = window;
      googletag.cmd.push(function () {
        googletag.destroySlots();
      });

      setIsTransition(true);
    };

    const endTransition = () => {
      setIsTransition(false);
    };

    router.events.on("routeChangeStart", startTransition);
    router.events.on("routeChangeComplete", endTransition);

    return () => {
      router.events.off("routeChangeStart", startTransition);
      router.events.off("routeChangeComplete", endTransition);
    };
  }, []);

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
      <Ad
        setIsLoading={setIsLoading}
        isTransition={isTransition}
        slotId={"/22802458718/start_chapter_reward"}
      />
    </>
  );
};

export default ChatPage;
