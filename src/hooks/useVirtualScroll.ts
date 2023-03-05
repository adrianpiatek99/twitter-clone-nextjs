import type { RefObject } from "react";

import { observeWindowOffset, useWindowVirtualizer } from "@tanstack/react-virtual";

export const useVirtualScroll = <TData>(data: TData[], parentRef: RefObject<HTMLElement>) => {
  const { getVirtualItems, getTotalSize, measureElement } = useWindowVirtualizer({
    count: data.length,
    overscan: 2,
    estimateSize: () => 25,
    observeElementOffset: (instance, cb) =>
      observeWindowOffset(instance, offset => cb(offset - Number(parentRef.current?.offsetTop)))
  });

  const items = getVirtualItems();
  const totalSize = getTotalSize();

  return { items, totalSize, measureElement };
};
