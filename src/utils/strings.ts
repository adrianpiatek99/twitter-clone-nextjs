import emojiRegex from "emoji-regex";

export const containsEmojis = (value?: string | null) => {
  const contains = emojiRegex();

  if (!value) {
    return false;
  }

  return contains.test(value);
};

export const toBase64 = (value: string): string => {
  if (typeof window === "undefined") {
    return Buffer.from(value).toString("base64");
  }

  return window.btoa(value);
};

export const replaceSpacesWithDashes = (value: string) => value.replace(/\s+/g, "-");

export const replaceDashesWithSpaces = <T>(value: string) => value.replace("-", " ") as T;
