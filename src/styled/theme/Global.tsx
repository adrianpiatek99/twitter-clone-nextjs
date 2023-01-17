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
    color: ${({ theme }) => theme.neutral20};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    ${({ theme }) => theme.text.m};
    overflow-y: scroll;
    word-wrap: break-word;
  }

  span {
    font-family: ${({ theme }) => theme.fontFamily.primary};
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
    ${({ theme }) => theme.heading.xs};
  }

  button {
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    ${({ theme }) => theme.text.m};
  }

  input,
  textarea {
    outline: none;
    border: none;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    ${({ theme }) => theme.text.m};
  }

  a {
    text-decoration: none;
    color: inherit;
    outline: none;
    width: max-content;

    &:hover:not(:disabled),
    &:focus-visible {
      text-decoration: underline;
    }
  }

  li {
    list-style: none;
  }

  .MuiTooltip-tooltip {
    background-color: ${({ theme }) => theme.darkGray};
    color: ${({ theme }) => theme.neutral20};
    line-height: 11px;
    font-size: 11px;
    padding: 5px 7px;
  }

  .MuiTooltip-popper {
    &[data-popper-placement*="bottom"] {
      margin-top: -16px !important;
    };

    &[data-popper-placement*="top"] {
    margin-bottom: -16px !important;
    };

    &[data-popper-placement*="right"] {
      margin-left: -16px !important;
    };

    &[data-popper-placement*="left"] {
      margin-right: -16px !important;
    };

    @media ${({ theme }) => theme.breakpoints.sm} {
      &[data-popper-placement*="bottom"] {
        margin-top: -8px !important;
      };

      &[data-popper-placement*="top"] {
      margin-bottom: -8px !important;
      };

      &[data-popper-placement*="right"] {
        margin-left: -8px !important;
      };

      &[data-popper-placement*="left"] {
        margin-right: -8px !important;
      };
  }
  }
`;
