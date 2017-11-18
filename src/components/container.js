import React, { Component } from "react";
import styled from "styled-components";
import { Flex } from "grid-styled";
import { rem } from "polished";

const ContainerStyled = styled(Flex)`
  min-width: ${rem("320px")};
  max-width: ${rem("800px")};
  margin: 0 auto;
`;

const Container = props => (
  <ContainerStyled className={props.className} {...props}>
    {props.children}
  </ContainerStyled>
);

export default Container;
