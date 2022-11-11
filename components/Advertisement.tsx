import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Advertisement = ({ setIsLoading }: { setIsLoading: any }) => {
  const router = useRouter();
  const rewardedAdRef = useRef<any>();
  const modalRef = useRef<any>();
  const modalMessageRef = useRef<any>();
  const chapterButtonRef = useRef<HTMLButtonElement>();
  const selectedChapter = useRef<number>();
  const eventRef = useRef<any>();

  useEffect(() => {
    const { googletag } = window;
    window.googletag = window.googletag || { cmd: [] };

    googletag.cmd.push(function () {
      rewardedAdRef.current = googletag.defineOutOfPageSlot(
        "/22802458718/start_chapter_reward",
        googletag.enums.OutOfPageFormat.REWARDED
      );

      if (rewardedAdRef.current) {
        rewardedAdRef.current.addService(googletag.pubads());

        googletag
          .pubads()
          .addEventListener("rewardedSlotReady", function (event: any) {
            setIsLoading(false);
            eventRef.current = event;
          });

        googletag.pubads().addEventListener("rewardedSlotClosed", () => {
          googletag.destroySlots([rewardedAdRef.current]);
        });

        googletag
          .pubads()
          .addEventListener("rewardedSlotGranted", function (event: any) {
            googletag.destroySlots([rewardedAdRef.current]);
            router.push(`/chat/${selectedChapter.current}`);
          });

        googletag.enableServices();
        googletag.display(rewardedAdRef.current);
      }
    });

    router.events.on("routeChangeComplete", removeSlot);
    return () => {
      router.events.off("routeChangeComplete", removeSlot);
    };
  }, [router.events]);

  const removeSlot = function () {
    const { googletag } = window;
    googletag.cmd.push(function () {
      googletag.destroySlots();
    });
  };

  const onClickChapter = (chapterId: number) => {
    if (eventRef.current) {
      eventRef.current.makeRewardedVisible();
    }
    selectedChapter.current = chapterId;
  };

  useEffect(() => {
    setTimeout(() => {
      const { googletag } = window;
      googletag.pubads().refresh([rewardedAdRef.current]);
    }, 2000);
  });

  return (
    <>
      <h1>Display rewarded ad in nextJS</h1>
      <button ref={chapterButtonRef} onClick={() => onClickChapter(1)}>
        1회차 클릭
      </button>
      <button ref={chapterButtonRef} onClick={() => onClickChapter(2)}>
        2회차 클릭
      </button>
      <button ref={chapterButtonRef} onClick={() => onClickChapter(3)}>
        3회차 클릭
      </button>
      <button ref={chapterButtonRef} onClick={() => onClickChapter(4)}>
        4회차 클릭
      </button>
    </>
  );
};

export default Advertisement;
