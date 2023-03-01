import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.neutral50};
    ${({ theme }) => theme.fontFamily};
    ${({ theme }) => theme.text.m};
    overflow-y: scroll;
    word-wrap: break-word;
  }

  span {
    ${({ theme }) => theme.fontFamily};
  }

  h1,
  h2,
  h3,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    ${({ theme }) => theme.fontFamily};
    ${({ theme }) => theme.heading.xs};
  }

  button {
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    ${({ theme }) => theme.fontFamily};
    ${({ theme }) => theme.text.m};
  }

  input,
  textarea {
    outline: none;
    border: none;
    margin: 0;
    ${({ theme }) => theme.fontFamily};
    ${({ theme }) => theme.text.m};
  }

  a {
    text-decoration: none;
    color: inherit;
    outline: none;
    width: max-content;

    @media (hover: hover) {
      &:hover:not(:disabled){
        text-decoration: none;
      }
    }

    &:focus-visible {
      text-decoration: none;
    }
  }

  li {
    list-style: none;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    border: 3px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(116, 114, 114, 0.7);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(116, 114, 114, 0.8);
  }

  &::-webkit-scrollbar-thumb:active {
    border: 2px solid rgba(0, 0, 0, 0);
  }
`;
