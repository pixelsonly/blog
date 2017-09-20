import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import {
  space,
  width,
  height,
  color,
  fontSize,
  responsiveStyle,
} from "styled-system";
import { Flex, Box } from "grid-styled";
import { injectGlobal } from "styled-components";
import { normalize, rem } from "polished";
import breakpoint from "./breakpoints";
import theme from "./theme";

export const PageTitle = styled.h1`
  ${space} ${width} ${fontSize};
  font-family: ${theme.fonts.serif};
  text-align: center;
`;

export const ProfilePhoto = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 45%;
  height: auto;
  border-radius: ${rem("10000px")};

  ${breakpoint.medium`max-width: 30%;`};
  ${breakpoint.large`max-width: 25%;`};
`;

export const AuthorName = styled.h1`
  ${space} ${fontSize};
  color: ${theme.colors.mediumGray};
  font-family: ${theme.fonts.serif};
  font-weight: 700;
  text-align: center;
`;

export const Tagline = styled.p`
  ${space} ${fontSize};
  color: ${theme.colors.gray};
  text-align: center;
`;

export const RecentArticles = styled.h2`
  ${space} ${fontSize};
  color: ${theme.colors.mediumGray};
`;

export const ArticleSeparated = styled.article`
  ${space};
  border-top: ${rem("1px")} solid ${theme.colors.lightGray};
`;

export const ArticleLink = styled(Link)`
  display: block;
  color: ${theme.colors.mediumGray};
  text-decoration: none;
`;

export const FeaturedImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

export const Thumbnail = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: ${rem("10000px")};
`;

export const ArticlePreview = styled(Box)`
  ${space};
  background-color: ${theme.colors.white};
`;

export const ArticleDate = styled.time`
  display: block;
  ${space} ${fontSize};
  color: ${theme.colors.gray};
`;

export const ArticleTitle = styled.h3`
  ${space} ${fontSize};
  font-family: ${theme.fonts.serif};
  font-weight: 700;
`;

export const ArticleBlurb = styled.p`
  ${space} ${fontSize};
  color: ${theme.colors.gray};
  line-height: normal;
`;

export const ReadMore = styled.small`
  ${space} ${fontSize};
  text-decoration: underline;
`;

export const Breadcrumbs = styled(Flex)`
  ${space} ${fontSize};
  list-style: none;

  li {
    margin-right: ${rem("8px")};
    color: ${theme.colors.lightGray};
  }

  a,
  a:active,
  a:visited {
    color: ${theme.colors.mediumGray};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const HLineMedium = styled.hr`
  border-bottom-color: ${theme.colors.mediumGray};
`;

export const HLineDark = styled.hr`
  border-bottom-color: ${theme.colors.darkGray};
`;

export const injectGlobalStyles = () => {
  injectGlobal`
    ${normalize()}

    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      background-color: ${theme.colors.midnight};
      font-family: ${theme.fonts.body};
      color: ${theme.colors.mediumGray};

      a,
      a:active,
      a:visited {
        color: ${theme.colors.mediumGray};
        text-decoration: underline;
      }

      a:hover {
        color: ${theme.colors.darkGray};
      }

      hr {
        height: ${rem("1px")};
        border: 0;
        border-bottom: ${rem("1px")} solid ${theme.colors.lightGray};
      }
    }

    body.menuOpen {
      overflow: hidden;
    }

    ::selection {
      background: ${theme.colors.pink};
      color: ${theme.colors.white};
    }
  `;

  return true;
};

export default injectGlobalStyles();
