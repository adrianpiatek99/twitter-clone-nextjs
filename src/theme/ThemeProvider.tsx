import type { ReactNode } from "react";
import React from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { theme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
