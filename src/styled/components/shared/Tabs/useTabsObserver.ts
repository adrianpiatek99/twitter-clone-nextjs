import type { RefObject } from "react";
import { useEffect, useState } from "react";

type ScrollTo = "forward" | "backward";

export const useTabsObserver = (tabGroupRef: RefObject<HTMLElement>) => {
  const [forwardArrow, setForwardArrow] = useState(false);
  const [backwardArrow, setBackwardArrow] = useState(false);
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
  };

  const scrollTo = (scrollTo: ScrollTo) => {
    const { current } = tabGroupRef;

    if (current) {
      const scrollPosition = current.scrollLeft;
      const numberOfPixelsToScroll = 225;

      const scrollAxisX = () =>
        scrollTo === "forward"
          ? scrollPosition + numberOfPixelsToScroll
          : scrollPosition - numberOfPixelsToScroll;

      current.scrollTo({
        top: 0,
        left: scrollAxisX(),
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const { current } = tabGroupRef;

    if (!window.IntersectionObserver) return;

    if (current) {
      const firstChild = current.firstChild as HTMLAnchorElement;

      const observerFnc = () => {
        const firstChildObserver = new IntersectionObserver(entries => {
          setBackwardArrow(!entries[0]!.isIntersecting);
        }, observerOptions);

        if (firstChild) {
          firstChildObserver.observe(firstChild);

          return () => {
            firstChildObserver.unobserve(firstChild);
          };
        }
      };

      observerFnc();

      current.addEventListener("scroll", observerFnc);
      current.addEventListener("resize", observerFnc);

      return () => {
        current.removeEventListener("scroll", observerFnc);
        current.removeEventListener("resize", observerFnc);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabGroupRef]);

  useEffect(() => {
    const { current } = tabGroupRef;

    if (!window.IntersectionObserver) return;

    if (current) {
      const lastChild = current.lastChild as HTMLAnchorElement;

      const observerFnc = () => {
        const lastChildObserver = new IntersectionObserver(entries => {
          setForwardArrow(!entries[0]!.isIntersecting);
        }, observerOptions);

        if (lastChild) {
          lastChildObserver.observe(lastChild);

          return () => {
            lastChildObserver.unobserve(lastChild);
          };
        }
      };

      observerFnc();

      current.addEventListener("scroll", observerFnc);
      current.addEventListener("resize", observerFnc);

      return () => {
        current.removeEventListener("scroll", observerFnc);
        current.removeEventListener("resize", observerFnc);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabGroupRef]);

  return { forwardArrow, backwardArrow, scrollTo };
};
