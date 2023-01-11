import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    logo: string;
    primary05: string;
    neutral00: string;
    neutral20: string;
    neutral40: string;
    neutral100: string;
    darker10: string;
    background: string;
    background2: string;
    background3: string;
    darkGray: string;
    border: string;
    border2: string;
    border3: string;
    error10: string;
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
    focus: {
      primary: string;
    };
    active: {
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
