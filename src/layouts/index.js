import React from "react";
import PropTypes from "prop-types";
import injectGlobalStyles from "../styles/global";
import { IntlProvider } from "react-intl";

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
