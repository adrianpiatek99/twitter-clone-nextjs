import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    background2: string;
    background3: string;
    border: string;
    border2: string;
    border3: string;
    primary05: string;
    white: string;
    neutral50: string;
    neutral100: string;
    neutral150: string;
    neutral300: string;
    dark150: string;
    gray500: string;
    pink400: string;
    emerald400: string;
    error20: string;
    error40: string;
    fontFamily: {
      primary: string;
      secondary: string;
    };
    text: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
    };
    heading: {
      xs: string;
      s: string;
      m: string;
    };
    focus: {
      primary: string;
    };
    active: {
      primary: string;
      secondary: string;
    };
    boxShadows: {
      primary: string;
      secondary: string;
    };
    breakpointSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
