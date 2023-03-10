import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactElement | ReactElement[];
  rootId: string;
}

export const Portal = ({ children, rootId }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById(rootId);
    setMounted(true);
  }, [rootId]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
