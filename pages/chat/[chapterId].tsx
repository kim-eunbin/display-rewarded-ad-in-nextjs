import React, { useEffect, useState } from "react";
import Ad from "../../components/Advertisement";
import Head from "next/head";
import { useRouter } from "next/router";

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const startTransition = () => {
      // 페이지 전환이 시작될 때 슬롯을 destroy
      const { googletag } = window;

      googletag.cmd.push(function (e) {
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
  }, [router.events]);

  return (
    <>
      <Head>
        <script
          async={true}
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script>
          {`var googletag = googletag || {};
          googletag.cmd = googletag.cmd || [];`}
        </script>
      </Head>
      <h1>작품 플레이 화면</h1>
      <button onClick={() => router.push("/")}>돌아가기</button>
      <Ad
        onLoading={setIsLoading}
        isTransition={isTransition}
        slotId={"/22802458718/start_chapter_reward"}
      />
      {isLoading && <>loading....</>}
    </>
  );
};

export default ChatPage;
