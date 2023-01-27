import { useEffect } from "react";

import type { NextRouter } from "next/router";

type ScrollPosition = {
  route: string;
  position: number;
};

const getScrollPositions = (): ScrollPosition[] => {
  const json = sessionStorage.getItem("scrollPositions");

  if (json) {
    return JSON.parse(json);
  }

  return [];
};

const saveScrollPos = (asPath: string) => {
  const scrollPosition = {
    route: `scrollPos:${asPath}`,
    position: window.scrollY
  };

  sessionStorage.setItem(
    "scrollPositions",
    JSON.stringify([
      ...getScrollPositions().filter(({ route }) => route !== scrollPosition.route),
      scrollPosition
    ])
  );
};

const restoreScrollPos = (asPath: string) => {
  const scrollPos = getScrollPositions().find(pos => pos.route === `scrollPos:${asPath}`);

  if (scrollPos) {
    window.scrollTo({ top: scrollPos.position });
  }
};

export const useScrollRestoration = (router: NextRouter) => {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    let shouldScrollRestore = false;

    window.history.scrollRestoration = "manual";
    restoreScrollPos(router.asPath);

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(router.asPath);
      delete event["returnValue"];
    };

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath);
    };

    const onRouteChangeComplete = (url: string) => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false;
        restoreScrollPos(url);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    router.beforePopState(() => {
      shouldScrollRestore = true;

      return true;
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
      router.beforePopState(() => true);
    };
  }, [router]);
};
