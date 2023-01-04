import React, { ReactElement } from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { theme } from "./theme";

export const ThemeProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
