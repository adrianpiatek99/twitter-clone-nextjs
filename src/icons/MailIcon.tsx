import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgMailIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" ref={ref} {...props}>
    <path d="m20 8-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
  </svg>
);
const ForwardRef = forwardRef(SvgMailIcon);
export default ForwardRef;
