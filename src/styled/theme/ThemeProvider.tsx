import type { FC, ReactElement } from "react";
import React from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { theme } from "./theme";

interface ThemeProviderProps {
  children: ReactElement | ReactElement[];
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
