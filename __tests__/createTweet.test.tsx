import { hideConsoleError, renderWithProviders } from "__tests__/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "pages/home";

describe("Create a tweet 🆕", () => {
  describe("when successfully created a tweet", () => {
    it("should show in the screen", async () => {
      hideConsoleError();
      renderWithProviders(<Home />);

      const tweetText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique mi ac sem scelerisque commodo. Quisque congue aliquam justo, at rutrum ligula finibus et.";

      const textarea = screen.getByLabelText(/create a tweet/i);

      await userEvent.type(textarea, tweetText);

      const createTweetButton = screen.getByTestId("tweetButton");

      expect(createTweetButton).not.toBeDisabled();

      await userEvent.click(createTweetButton);

      await waitFor(() => {
        expect(textarea).toHaveValue("");
        expect(createTweetButton).toBeDisabled();
      });
    });
  });
});
