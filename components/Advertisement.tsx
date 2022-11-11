import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Advertisement = ({ setIsLoading }: { setIsLoading: any }) => {
  const router = useRouter();
  const rewardedAdRef = useRef<any>();
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
          removeSlot();
        });

        googletag
          .pubads()
          .addEventListener("rewardedSlotGranted", function (event: any) {
            removeSlot();
          });

        googletag.enableServices();
        googletag.display(rewardedAdRef.current);
      }
    });
  }, []);

  const removeSlot = function () {
    console.log("removeSlot");
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

  useEffect(() => {
    setTimeout(() => {
      const { googletag } = window;
      console.log("refresh", googletag, rewardedAdRef.current);

      googletag.pubads().refresh([rewardedAdRef.current]);
    }, 2000);
  });

  return (
    <>
      <h1>Display rewarded ad in nextJS</h1>
    </>
  );
};

export default Advertisement;
