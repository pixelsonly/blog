import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Flex, Box, Grid } from "grid-styled";
import theme from "../styles/theme";

const AnchorStyled = styled.a`
  text-decoration: none;
`;

const ExternalAnchor = props => (
  <AnchorStyled
    href={props.href}
    title={props.title}
    className={props.className}>
    {props.children}
  </AnchorStyled>
);

export default ExternalAnchor;
