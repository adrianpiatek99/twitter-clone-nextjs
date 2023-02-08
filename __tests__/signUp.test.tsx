import { mockedUser } from "__mocks__/user.mock";
import { hideConsoleError, renderWithProviders } from "__tests__/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "pages";

describe("Create new account 👤", () => {
  describe("when successfully created a new account", () => {
    it("should automatically change the current tab to the sign in tab", async () => {
      hideConsoleError();
      renderWithProviders(<Login />);

      const signUpTab = screen.getByRole("button", { name: /sign up tab/i });

      await userEvent.click(signUpTab);

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const nameInput = screen.getByRole("textbox", { name: "Name" });
      const emailInput = screen.getByRole("textbox", { name: /email address/i });
      const passwordInput = screen.getByLabelText("Password");
      const repeatPasswordInput = screen.getByLabelText("Repeat password");

      await userEvent.type(usernameInput, mockedUser.screenName);
      await userEvent.type(nameInput, mockedUser.name);
      await userEvent.type(emailInput, mockedUser.email);
      await userEvent.type(passwordInput, mockedUser.password);
      await userEvent.type(repeatPasswordInput, mockedUser.password);

      const createAccountButton = screen.getByRole("button", {
        name: /create account/i
      });

      await userEvent.click(createAccountButton);

      const signInTab = screen.getByRole("button", { name: /sign in tab/i });

      const signInEmailInput = await screen.findByRole("textbox", { name: /email address/i });

      await waitFor(() => expect(signInTab).toHaveAttribute("tabindex", "0"));
      expect(signInEmailInput).toHaveValue(mockedUser.email);
      expect(passwordInput).toHaveValue(mockedUser.password);
    });
  });
});
