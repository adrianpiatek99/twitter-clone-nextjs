import type { Ref, SVGProps } from "react";
import * as React from "react";
import { forwardRef } from "react";

const SvgNotificationOutlinedIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" ref={ref} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M18 10a6 6 0 1 0-12 0v8h12v-8zm2 8.667.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
  </svg>
);
const ForwardRef = forwardRef(SvgNotificationOutlinedIcon);
export default ForwardRef;
