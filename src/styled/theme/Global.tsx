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
    color: ${({ theme }) => theme.secondary};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    ${({ theme }) => theme.text.m};
  }

  h1,
  h2,
  h3,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    ${({ theme }) => theme.heading.xs}
  }

  button {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.secondary};
    ${({ theme }) => theme.text.m};
  }


  input,
  textarea {
    outline: none;
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    list-style: none;
  }
`;
