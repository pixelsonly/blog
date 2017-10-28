import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { space, fontSize } from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem } from "polished";
import breakpoint from "../styles/breakpoints";
import theme from "../styles/theme";
import Icon, { NetlifyBadge, GatsbyBadge } from "../components/icons";
import ExternalAnchor from "../components/external-anchor";
import Container from "../components/container";

const LegalText = styled.p`
  ${space};
  color: ${theme.colors.darkGray};
  font-size: ${rem("14px")};
  line-height: normal;
  text-align: center;

  ${breakpoint.medium`text-align: right;`};
`;

const MiscText = styled.p`
  ${space} ${fontSize};
  color: ${theme.colors.darkGray};
  text-align: center;

  ${breakpoint.medium`text-align: right;`};

  a,
  a:active,
  a:visited,
  a:hover {
    color: ${theme.colors.darkGray};
    text-decoration: underline;
  }
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
      <Container>
        <Flex
          is="footer"
          direction="row"
          justify="flex-start"
          align="flex-start"
          wrap
          w={[1]}
          pb={[4]}
          flex="1 1 auto">
          <Box width={[1, 1 / 4]} mt={[4]} pl={[0, 1, 0]}>
            <Flex justify="center">
              {Object.keys(links).map((link, i) => (
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
              ))}
            </Flex>
          </Box>
          <Box width={[1, 3 / 4]} mt={[4]} pr={[0, 1, 0]}>
            <LegalText mb={[3]} px={[1, 0]}>
              Copyright &copy; 2005&ndash;{year} Ryan Lindsey. All rights
              reserved.
            </LegalText>
            <MiscText>
              <a
                href="https://www.netlify.com/"
                title="Continous deployment provided by Netlify">
                <NetlifyBadge fill={theme.colors.darkGray} />
              </a>
            </MiscText>
          </Box>
        </Flex>
      </Container>
    );
  }
}
