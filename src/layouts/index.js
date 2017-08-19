import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Menu from "react-burger-menu/lib/menus/slide";
import styled from "styled-components";
import { IntlProvider } from "react-intl";
import { Flex, Box, Grid } from "grid-styled";
import { rem, lighten, darken } from "polished";
import injectGlobalStyles from "../styles/global";
import theme, { menuTheme } from "../styles/theme";
import Icon from "../components/icons";
import ExternalAnchor from "../components/external-anchor";
import Footer from "../components/footer";

require("prismjs/themes/prism.css");

const isMenuOpen = state => {
  return state.isOpen;
};

const Header = styled.header`
  height: ${rem("60px")};
  width: 100%;
  background-color: ${theme.colors.white};
`;

const OuterContainer = styled.div``;

const PageContainer = styled(Flex)`
  background-color: ${theme.colors.white};
  border-bottom: ${rem("4px")} solid ${theme.colors.darkGray};
`;

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

const MenuLinkText = styled.span`
  color: ${theme.colors.lightGray};
  font-size: ${rem("18px")};
`;

export default class TemplateWrapper extends Component {
  render() {
    const { externalLinks, resume } = this.props.data.site.siteMetadata;

    return (
      <IntlProvider locale="en">
        <OuterContainer id="outer-container">
          <Header>
            <Menu
              isOpen={false}
              onStateChange={isMenuOpen}
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              styles={menuTheme}
              width={240}>
              <Flex column>
                <Box pl={2} pt={2}>
                  <MenuLink to={`/`}>
                    <MenuLinkText>Home</MenuLinkText>
                  </MenuLink>
                </Box>
                <Box pl={2} pt={2}>
                  <MenuLink to={`/articles`}>
                    <MenuLinkText>Articles</MenuLinkText>
                  </MenuLink>
                </Box>
                <Box pl={2} pt={2}>
                  <ExternalAnchor href={resume.website}>
                    <MenuLinkText>Resume</MenuLinkText>
                  </ExternalAnchor>
                </Box>
              </Flex>
              <Box pt={4} pl={2}>
                <Flex column>
                  {Object.keys(externalLinks).map((link, i) =>
                    <Box py={1} key={i}>
                      <ExternalAnchor href={externalLinks[link]}>
                        <Icon
                          icon={link}
                          width="32"
                          height="32"
                          fill={theme.colors.mediumGray}
                        />
                      </ExternalAnchor>
                    </Box>
                  )}
                </Flex>
              </Box>
            </Menu>
          </Header>
          <PageContainer is="main" id="page-wrap">
            {this.props.children()}
          </PageContainer>
          <Footer links={externalLinks} />
        </OuterContainer>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        externalLinks {
          github
          linkedin
          instagram
          twitter
        }
        resume {
          website
          pdf
        }
      }
    }
  }
`;
