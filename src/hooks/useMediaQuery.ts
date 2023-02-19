import { useEffect, useState } from "react";

import { debounce } from "utils/debounce";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", debounce(listener, 150));

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return !matches;
};
