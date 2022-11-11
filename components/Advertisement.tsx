import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Advertisement = ({
  setIsLoading,
  isTransition,
  slotId,
}: {
  setIsLoading: any;
  isTransition: boolean;
  slotId: string;
}) => {
  const rewardedAdRef = useRef<any>();
  const timerRef = useRef<any>();

  useEffect(() => {
    if (!isTransition && typeof window !== undefined) {
      console.log("정의");
      const { googletag } = window;
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(function () {
        rewardedAdRef.current = googletag.defineOutOfPageSlot(
          slotId,
          googletag.enums.OutOfPageFormat.REWARDED
        );

        if (rewardedAdRef.current) {
          rewardedAdRef.current.addService(googletag.pubads());

          googletag
            .pubads()
            .addEventListener("rewardedSlotReady", function (event: any) {
              console.log("event in rewardedSlotReady", event);
              clearTimeout(timerRef.current);
              setIsLoading(false);
              event.makeRewardedVisible();
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
    }

    return () => {
      removeSlot();
    };
  }, [isTransition, slotId]);

  const removeSlot = function () {
    const { googletag } = window;
    googletag.cmd.push(function () {
      console.log("destroy slot");
      googletag.destroySlots();
    });
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      console.log("refresh");
      const { googletag } = window;
      googletag.pubads().refresh([rewardedAdRef.current]);
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
    };
  });

  return (
    <>
      <h1>Display rewarded ad in nextJS</h1>
    </>
  );
};

export default Advertisement;
