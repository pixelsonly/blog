import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { space } from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem } from "polished";
import breakpoint from "../styles/breakpoints";
import theme from "../styles/theme";
import Icon from "../components/icons";
import ExternalAnchor from "../components/external-anchor";
import Container from "../components/container";

const ContainerStyled = styled(Container)`
  min-height: ${rem("180px")};
`;

const LegalText = styled.p`
  ${space};
  color: ${theme.colors.darkGray};
  font-size: ${rem("14px")};
  line-height: normal;
  text-align: center;

  ${breakpoint.medium`text-align: right;`};
`;

const SocialIconLink = styled(ExternalAnchor)`
  display: block;
  text-align: center;

  ${breakpoint.medium`text-align: left;`};

  &:hover svg {
    fill: ${theme.colors.lightGray};
  }
`;

export default class Footer extends Component {
  static propTypes = { links: PropTypes.object.isRequired };

  render() {
    const { links } = this.props;
    const year = new Date().getFullYear();

    return (
      <ContainerStyled>
        <Flex
          is="footer"
          direction="row"
          justify="flex-start"
          align="flex-start"
          wrap
          w={[1]}
          flex="1 1 auto">
          <Box width={[1, 1 / 4]} mt={[4]} pl={[0, 1, 0]}>
            <Flex justify="center">
              {Object.keys(links).map((link, i) =>
                <Box flex={["1 1 auto"]} key={i}>
                  <SocialIconLink href={links[link]}>
                    <Icon
                      icon={link}
                      width="32"
                      height="32"
                      fill={theme.colors.darkGray}
                    />
                  </SocialIconLink>
                </Box>
              )}
            </Flex>
          </Box>
          <Box width={[1, 3 / 4]} mt={[4]} pr={[0, 1, 0]}>
            <LegalText mb={[3]} px={[1, 0]}>
              Copyright &copy; 2005&ndash;{year} Ryan Lindsey. All rights
              reserved.
            </LegalText>
          </Box>
        </Flex>
      </ContainerStyled>
    );
  }
}
