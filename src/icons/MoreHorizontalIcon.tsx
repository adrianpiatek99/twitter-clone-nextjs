import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgMoreHorizontalIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" ref={ref} {...props}>
    <path
      fill="currentColor"
      d="M3.625 7.5a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0zm5 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0zM12.5 8.625a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgMoreHorizontalIcon);
export default ForwardRef;
