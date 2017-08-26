import React from "react";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { space } from "styled-system";
import Container from "../components/container";

const NotFoundPage = () =>
  <Container>
    <Flex justify="flex-start" wrap>
      <Box w={[1]} my={[4]}>
        <h1>404: NOT FOUND</h1>
        <p>You're looking for a page that doesn&#39;t exist&hellip;SAD!</p>
      </Box>
    </Flex>
  </Container>;

export default NotFoundPage;
