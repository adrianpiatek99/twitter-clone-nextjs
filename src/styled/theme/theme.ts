import { DefaultTheme } from "styled-components";

const fonts = {
  text: {
    xs: "font-size: 13px; line-height: 16px;",
    s: "font-size: 14px; line-height: 17px;",
    m: "font-size: 15px; line-height: 20px;",
    l: "font-size: 17px; line-height: 24px;",
    xl: "font-size: 20px; line-height: 24px;",
    xxl: "font-size: 23px; line-height: 28px;"
  },
  heading: {
    xs: "font-size: 20px; line-height: 24px;",
    s: "font-size: 30px; line-height: 38px;"
  },
  fontFamily: {
    primary: "-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif",
    secondary: "-apple-system, BlinkMacSystemFont, Open Sans, Helvetica, Arial, sans-serif"
  }
};

const breakpointSizes = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px"
};

const breakpoints = {
  xs: `screen and (min-width: ${breakpointSizes.xs})`,
  sm: `screen and (min-width: ${breakpointSizes.sm})`,
  md: `screen and (min-width: ${breakpointSizes.md})`,
  lg: `screen and (min-width: ${breakpointSizes.lg})`,
  xl: `screen and (min-width: ${breakpointSizes.xl})`,
  xxl: `screen and (min-width: ${breakpointSizes.xxl})`
};

export const theme: DefaultTheme = {
  logo: "rgb(214, 217, 219)",
  primary05: "#1d9bf0",
  neutral00: "#FFFFFF",
  neutral20: "#eff3f4",
  neutral40: "#e7e9ea",
  neutral100: "rgb(113, 118, 123);",
  darker10: "#0f1419",
  background: "#000",
  background2: "#1C1F23",
  background3: "rgb(22, 24, 28)",
  darkGray: "#657786",
  border: "#2f3336",
  border2: "#333639",
  border3: "#536471",
  error20: "#f44336",
  error40: "#d32f2f",
  focus: {
    primary: "rgb(142, 205, 248)"
  },
  active: {
    primary: "rgba(217, 217, 217, 0.2)",
    secondary: "rgba(29, 155, 240, 0.2)"
  },
  boxShadows: {
    primary: "inset rgb(142, 205, 248) 0px 0px 0px 2px",
    secondary: "inset rgb(239, 243, 244) 0px 0px 0px 2px"
  },
  ...fonts,
  breakpointSizes,
  breakpoints
};
