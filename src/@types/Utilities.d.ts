import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export {};

declare global {
  type NextApiError = { error: string };
  type SvgrElement = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
