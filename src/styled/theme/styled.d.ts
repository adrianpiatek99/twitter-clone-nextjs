import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    background2: string;
    border: string;
    fonts: {
      /** Regular */
      primary400: string;
      /** Medium */
      primary500: string;
      /** Semi Bold */
      primary600: string;
      /** Bold */
      primary700: string;
      /** Extra bold */
      primary800: string;
    };
    heading: {
      /* H6 */
      xs: string;
      /* H5 */
      s: string;
      /* H4 */
      m: string;
      /* H3 */
      l: string;
      /* H2 */
      xl: string;
      /* H1 */
      xxl: string;
    };
    text: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    hover: {
      primary: string;
      secondary: string;
      third: string;
    };
    focus: {
      primary: string;
    };
    active: {
      primary: string;
      secondary: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
