import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { FC, ReactElement, ReactNode } from "react";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Layout from "templates/layout";
import { mockedSession } from "__mocks__/user.mock";

const queryClient = new QueryClient();

const AllProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={mockedSession}>
        <ReduxStoreProvider>
          <ThemeProvider>
            <GlobalStyle />
            <Layout>{children}</Layout>
          </ThemeProvider>
        </ReduxStoreProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export const hideConsoleError = () => {
  jest.spyOn(console, "error").mockImplementation(() => null);
};
