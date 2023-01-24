import type { FC, ReactElement} from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactElement | ReactElement[];
  rootId: string;
}

export const Portal: FC<PortalProps> = ({ children, rootId }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById(rootId);
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
