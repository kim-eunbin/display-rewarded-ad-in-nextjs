import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Advertisement = ({ setIsLoading }: { setIsLoading: any }) => {
  const router = useRouter();
  const rewardedAdRef = useRef<any>();
  const watchAdButtonRef = useRef<any>();
  const modalRef = useRef<any>();
  const modalMessageRef = useRef<any>();

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
            console.log("rewardedSlotReady", event);
            watchAdButtonRef.current.onclick = function () {
              event.makeRewardedVisible();
              displayModal();
            };

            displayModal("reward", "Watch an ad to receive a special reward?");
          });

        googletag
          .pubads()
          .addEventListener("rewardedSlotClosed", dismissRewardedAd);

        googletag
          .pubads()
          .addEventListener("rewardedSlotGranted", function (event: any) {
            console.log("rewardedSlotGranted", event);
            console.log("rewared", event.payload.amount, event.payload.type);

            dismissRewardedAd();

            var reward = event.payload;

            displayModal(
              "grant",
              "You have been rewarded " +
                reward.amount +
                " " +
                reward.type +
                "!"
            );
          });

        googletag.enableServices();
        googletag.display(rewardedAdRef.current);

        // googletag.pubads().refresh([rewardedSlot])
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

  function dismissRewardedAd() {
    const { googletag } = window;
    console.log("rewardedSlotClosed");
    displayModal();

    googletag.destroySlots([rewardedAdRef.current]);
  }

  function displayModal(type?: string, message?: string) {
    var modal = modalRef.current;
    modal.removeAttribute("data-type");

    if (type) {
      modalMessageRef.current.textContent = message;
      modal.setAttribute("data-type", type);
    }
  }

  return (
    <>
      <h1>Display rewarded ad in nextJS</h1>
      <div id="modal" className="modal" ref={modalRef}>
        <div className="modalDialog">
          <p id="modalMessage" ref={modalMessageRef}></p>
          <span className="grantButtons">
            <input type="button" onClick={dismissRewardedAd} value="Close" />
          </span>
          <span className="rewardButtons">
            <input
              type="button"
              id="watchAdButton"
              value="Yes"
              ref={watchAdButtonRef}
            />
            <input type="button" onClick={dismissRewardedAd} value="No" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Advertisement;
