import { injectGlobal } from "styled-components";
import { normalize } from "polished";
import theme from "./theme";

export const injectGlobalStyles = () => {
  injectGlobal`
    ${normalize()}

    body {
      background-color: ${theme.colors.white};
      font-family: ${theme.fonts.body};
      color: ${theme.colors.darkGray};
    }

    ::selection {
      background: ${theme.colors.blue};
      color: ${theme.colors.white};
    }
  `;

  return true;
};

export default injectGlobalStyles();
