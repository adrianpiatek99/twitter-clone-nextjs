import { observeWindowOffset, useWindowVirtualizer } from "@tanstack/react-virtual";
import type { Properties } from "csstype";

export const useVirtualScroll = <TData>(data: TData[], parentElementOffset = 0) => {
  const { getVirtualItems, getTotalSize, measureElement } = useWindowVirtualizer({
    count: data.length,
    overscan: 3,
    estimateSize: () => 25,
    observeElementOffset: (instance, cb) =>
      observeWindowOffset(instance, offset => cb(offset - parentElementOffset))
  });

  const items = getVirtualItems();
  const totalSize = getTotalSize();

  const outerWrapperStyle: Properties = {
    position: "relative",
    width: "100%",
    height: `${totalSize}px`
  };

  const getItemStyle = (start: number): Properties => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transform: `translateY(${start}px)`
    };
  };

  return { items, totalSize, measureElement, outerWrapperStyle, getItemStyle };
};
