import React, { Component } from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import { IntlProvider } from "react-intl";
import styled from "styled-components";
import { space, width, height, fontSize, color } from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem, lighten } from "polished";
import injectGlobalStyles from "../styles/global";
import theme, { menuTheme } from "../styles/theme";
import breakpoint from "../styles/breakpoints";
import Container from "../components/container";
import Icon, { MenuOpen, MenuClose } from "../components/icons";
import ExternalAnchor from "../components/external-anchor";
import Footer from "../components/footer";
import { HLineDark } from "../styles/global";

require("prismjs/themes/prism-okaidia.css");
require("typeface-open-sans");
require("typeface-vollkorn");

const NavButton = styled.button`
  display: block;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: auto;
  position: fixed;
  border-bottom: ${rem("1px")} solid ${lighten(0.03, theme.colors.lightGray)};
`;

const NavOpen = styled(Nav)`
  height: 100vh;
  background-color: ${theme.colors.midnight};
  border-bottom-color: ${theme.colors.midnight};
`;

const NavClosed = styled(Nav)`
  height: auto;
  background-color: ${theme.colors.white};
`;

const OuterContainer = styled.div`
  ${space};
`;

const PageContainer = styled(Flex)`
  background-color: ${theme.colors.white};
  border-bottom: ${rem("4px")} solid ${theme.colors.darkGray};
`;

const NavLink = styled(Link)`
  ${fontSize};
  display: block;
  padding: ${rem("16px")} 0;
  color: ${theme.colors.lightGray} !important;
  text-decoration: none;
  text-align: center;

  &:hover {
    color: ${theme.colors.white} !important;
  }
`;

const SocialIconLink = styled(ExternalAnchor)`
  display: block;
  width: 100;
  text-align: center;

  &:hover svg {
    fill: ${theme.colors.lightGray};
  }
`;

export default class TemplateWrapper extends Component {
  static propTypes = {
    children: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({ menuIsOpen: true });
    document.body.classList.toggle("menuOpen");
  }

  closeMenu() {
    this.setState({ menuIsOpen: false });
    document.body.classList.toggle("menuOpen");
  }

  render() {
    const { externalLinks, resume } = this.props.data.site.siteMetadata;
    const isMenuOpen = this.state.menuIsOpen;

    return (
      <IntlProvider locale="en">
        <OuterContainer>
          {isMenuOpen ? (
            <NavOpen>
              <Flex justify="flex-end" mt={[2]} mx={[2, 2, 4]}>
                <Box px={[1]} py={[1]}>
                  <NavButton onClick={this.closeMenu}>
                    <MenuClose
                      fill={theme.colors.mediumGray}
                      width="24"
                      height="24"
                    />
                  </NavButton>
                </Box>
              </Flex>
              <Flex justify="center" wrap mx={[2, 2, 4]}>
                <Box w={[1]} py={[2]} mx={[2]}>
                  <HLineDark />
                </Box>
                <Box py={[3]}>
                  <NavLink onClick={this.closeMenu} to={`/`} fontSize={[4]}>
                    Home
                  </NavLink>
                  <NavLink
                    onClick={this.closeMenu}
                    to={`/articles`}
                    fontSize={[4]}>
                    Articles
                  </NavLink>
                </Box>
                <Box w={[1]} py={[2]} mx={[2]}>
                  <HLineDark />
                </Box>
                {Object.keys(externalLinks).map((link, i) => (
                  <Box w={[0.25]} pt={[3]} key={i}>
                    <SocialIconLink href={externalLinks[link]}>
                      <Icon
                        icon={link}
                        width="36"
                        height="36"
                        fill={theme.colors.darkGray}
                      />
                    </SocialIconLink>
                  </Box>
                ))}
              </Flex>
            </NavOpen>
          ) : (
            <NavClosed>
              <Flex>
                <Box w={[1]} px={[1]} py={[1]}>
                  <NavButton onClick={this.openMenu}>
                    <MenuOpen />
                  </NavButton>
                </Box>
              </Flex>
            </NavClosed>
          )}
          <PageContainer is="main" pt={[rem("80px")]}>
            {this.props.children()}
          </PageContainer>
          <Footer links={externalLinks} />
        </OuterContainer>
      </IntlProvider>
    );
  }
}

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
