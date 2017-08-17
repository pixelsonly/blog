import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import injectGlobalStyles from "../styles/global";

require("prismjs/themes/prism.css");

const TemplateWrapper = ({ children }) =>
  <IntlProvider locale="en">
    <div>
      {children()}
    </div>
  </IntlProvider>;

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
