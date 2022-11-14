import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Advertisement = ({
  onLoading,
  isTransition,
  slotId,
}: {
  onLoading: any;
  isTransition: boolean;
  slotId: string;
}) => {
  const rewardedAdRef = useRef<any>();
  const intervalTimerRef = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    if (!isTransition && typeof window !== undefined) {
      onLoading(true);

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
              clearInterval(intervalTimerRef.current);
              onLoading(false);
              event.makeRewardedVisible();
            });

          googletag.pubads().addEventListener("rewardedSlotClosed", () => {
            router.push("/");
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
  }, [isTransition, slotId]);

  const removeSlot = function () {
    const { googletag } = window;

    googletag.cmd.push(function () {
      googletag.destroySlots([rewardedAdRef.current]);
    });
  };

  useEffect(() => {
    intervalTimerRef.current = setInterval(() => {
      const { googletag } = window;

      googletag.pubads().refresh([rewardedAdRef.current]);
    }, 500);

    const timerId = setTimeout(() => {
      clearInterval(intervalTimerRef.current);
      onLoading(false);
    }, 2000);

    return () => {
      clearInterval(intervalTimerRef.current);
      clearTimeout(timerId);
    };
  }, []);

  return <></>;
};

export default Advertisement;
