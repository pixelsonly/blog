import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Box } from "grid-styled";
import { space, width, height } from "styled-system";
import { rem } from "polished";
import theme from "../styles/theme";

const LinkStyled = styled(Link)`
  ${space};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${rem("32px")};
  border: ${rem("1px")} solid ${theme.colors.lightGray};
  border-radius: ${rem("3px")};
  color: ${theme.colors.mediumGray};
  text-align: center;
  text-decoration: none;
  line-height: normal;
  outline: none;

  &:hover {
    border-color: ${theme.colors.mediumGray};
    color: ${theme.colors.darkGray};
  }
`;

const Button = props => (
  <LinkStyled className={props.className} to={props.to} title={props.title}>
    {props.children}
  </LinkStyled>
);

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
