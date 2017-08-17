import { injectGlobal } from "styled-components";
import { normalize } from "polished";
import theme from "./theme";

require("prismjs/themes/prism-okaidia.css");

export const injectGlobalStyles = () => {
  injectGlobal`
    ${normalize()}

    body {
      background-color: ${theme.colors.white};
      font-family: ${theme.fonts.body};
      color: ${theme.colors.darkGray};
    }

    :not(pre) > code[class*="language-"], pre[class*="language-"] {
      background: ${theme.colors.mediumGray};
      border-radius: 0;
    }

    ::selection {
      background: ${theme.colors.blue};
      color: ${theme.colors.white};
    }
  `;

  return true;
};

export default injectGlobalStyles();
