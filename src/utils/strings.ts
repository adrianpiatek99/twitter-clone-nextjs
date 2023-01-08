import emojiRegex from "emoji-regex";

export const containsEmojis = (value?: string | null) => {
  const contains = emojiRegex();

  if (!value) {
    return false;
  }

  return contains.test(value);
};
