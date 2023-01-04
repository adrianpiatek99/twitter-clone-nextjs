import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
    background2: string;
    border: string;
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
