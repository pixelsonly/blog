import React from "react";
import PropTypes from "prop-types";
import injectGlobalStyles from "../styles/global";

const TemplateWrapper = ({ children }) =>
  <div>
    {children()}
  </div>;

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
