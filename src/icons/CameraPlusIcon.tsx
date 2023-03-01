import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgCameraPlusIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" ref={ref} {...props}>
    <path d="M20 10.5a1 1 0 0 0-1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68H14a1 1 0 0 0 0-2H8.44A3 3 0 0 0 5.6 6.55l-.32 1H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a1 1 0 0 0-1-1.05zm-9-1a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm11-11h-1v-1a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2z" />
  </svg>
);
const ForwardRef = forwardRef(SvgCameraPlusIcon);
export default ForwardRef;
