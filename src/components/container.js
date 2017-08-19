import React, { Component } from "react";
import styled from "styled-components";
import { rem } from "polished";

const ContainerStyled = styled.div`
  margin: 0 auto;
  max-width: ${rem("900px")};
`;

const Container = props =>
  <ContainerStyled className={props.className}>
    {props.children}
  </ContainerStyled>;

export default Container;
