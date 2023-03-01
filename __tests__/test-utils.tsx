import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { FC, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { mockedSession } from "__mocks__/user.mock";
import { Layout } from "components/layout";
import { GlobalStyle, ThemeProvider } from "src/theme";

const queryClient = new QueryClient();

const AllProviders: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={mockedSession}>
        <ThemeProvider>
          <GlobalStyle />
          <Layout>{children}</Layout>
        </ThemeProvider>
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
