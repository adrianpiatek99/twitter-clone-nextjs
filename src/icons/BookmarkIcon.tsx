import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgBookmarkIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" ref={ref} {...props}>
    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
  </svg>
);
const ForwardRef = forwardRef(SvgBookmarkIcon);
export default ForwardRef;
