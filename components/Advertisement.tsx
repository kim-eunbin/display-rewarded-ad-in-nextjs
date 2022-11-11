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
            console.log("event in rewardedSlotReady", event);
            setIsLoading(false);
            eventRef.current = event;
          });

        googletag.pubads().addEventListener("rewardedSlotClosed", () => {
          console.log("rewardedAdRef", rewardedAdRef);
          googletag.destroySlots([rewardedAdRef.current]);
        });

        googletag
          .pubads()
          .addEventListener("rewardedSlotGranted", function (event: any) {
            console.log("rewardedSlotGranted", event);
            console.log("rewared", event.payload.amount, event.payload.type);

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
    console.log("Remove slot");
    const { googletag } = window;
    googletag.cmd.push(function () {
      googletag.destroySlots();
    });
  };

  const onClickChapter = (chapterId: number) => {
    console.log("eventRef.current", eventRef.current, rewardedAdRef.current);
    if (eventRef.current) {
      eventRef.current.makeRewardedVisible();
    }
    selectedChapter.current = chapterId;
  };

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
