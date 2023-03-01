import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgMailOutlinedIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" ref={ref} {...props}>
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
  </svg>
);
const ForwardRef = forwardRef(SvgMailOutlinedIcon);
export default ForwardRef;
