import { injectGlobal } from "styled-components";
import { normalize, rem } from "polished";
import theme from "./theme";

export const injectGlobalStyles = () => {
  injectGlobal`
    ${normalize()}

    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      min-width: ${rem("320px")};
      background-color: ${theme.colors.mediumGray};
      font-family: ${theme.fonts.body};
      color: ${theme.colors.mediumGray};
    }

    ::selection {
      background: ${theme.colors.pink};
      color: ${theme.colors.white};
    }
  `;

  return true;
};

export default injectGlobalStyles();
