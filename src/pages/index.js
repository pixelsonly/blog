import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import { space, color, fontSize, responsiveStyle } from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem } from "polished";
import breakpoint from "../styles/breakpoints";
import theme from "../styles/theme";
import Icon from "../components/icons";
import Container from "../components/container";

const ProfilePhoto = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 50%;
  height: auto;
  border-radius: 1000px;

  ${breakpoint.medium`max-width: 33%;`};
`;

const AuthorName = styled.h1`
  ${space} ${fontSize};
  color: ${theme.colors.darkGray};
  text-align: center;
`;

const Tagline = styled.p`
  ${space} ${fontSize};
  text-align: center;
`;

const RecentArticles = styled.h2`
  ${space} ${fontSize};
  color: ${theme.colors.gray};
  text-transform: uppercase;
`;

const ArticlesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: ${rem("24px")} 0;
    border-top: 1px solid ${theme.colors.lightGray};
  }

  li a {
    display: block;
    color: ${theme.colors.mediumGray};
    line-height: normal;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.darkGray};
      text-decoration: none;
    }

    h3 {
      margin-top: ${rem("8px")};
      color: ${theme.colors.mediumGray};
      font-size: ${rem("16px")};
    }
  }

  li p {
    margin-bottom: ${rem("4px")};
    font-size: ${rem("13px")};
    font-weight: lighter;
    line-height: normal;
  }

  li small {
    font-size: ${rem("12px")};
    text-decoration: underline;
  }

  li time {
    display: block;
    margin: ${rem("16px")} 0;
    color: ${theme.colors.gray};
    font-size: ${rem("10px")};
    text-transform: uppercase;
  }
`;

class IndexPage extends Component {
  render() {
    const meta = this.props.data.site.siteMetadata;
    const recentArticles = this.props.data.recentArticles.edges;
    const {
      name: authorName,
      biography: { biography: tagline },
      profilePhoto: { resize: { src: profilePhoto } },
    } = this.props.data.authors.edges[0].node;

    const firstArticle = i => (i < 1 ? true : false);

    return (
      <Container>
        <Helmet
          title={meta.title}
          meta={[{ name: "description", content: `${meta.description}` }]}
        />
        <Flex justify={["center"]} column>
          <Box
            width={[1]}
            px={[2, 2, 0]}
            pt={[2]}
            itemScope
            itemType="http://schema.org/Person">
            <ProfilePhoto src={profilePhoto} itemProp="image" />
            <AuthorName itemProp="name" mb={[0]}>
              {authorName}
            </AuthorName>
            <Tagline itemProp="jobTitle">
              {tagline}
            </Tagline>
          </Box>
          <Box width={[1]} px={[2, 2, 0]} py={[2]}>
            <RecentArticles fontSize={[0]}>Recent Articles</RecentArticles>
            <ArticlesList>
              {recentArticles.map((article, i) =>
                <li key={i}>
                  <time>
                    <FormattedDate
                      value={article.node.date}
                      year="numeric"
                      month="long"
                      day="2-digit"
                    />
                  </time>
                  <Link
                    to={`/articles/${article.node.slug}`}
                    title={article.node.title.title}>
                    <h3>
                      {article.node.title.title}
                    </h3>
                    <p>
                      {article.node.blurb.blurb}
                    </p>
                    <small>Read more</small>
                  </Link>
                </li>
              )}
            </ArticlesList>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    authors: allContentfulAuthor {
      edges {
        node {
          name
          biography {
            biography
            childMarkdownRemark {
              html
            }
          }
          profilePhoto {
            resize(width: 600, quality: 100, jpegProgressive: true) {
              src
              width
              height
            }
          }
        }
      }
    }
    recentArticles: allContentfulPost(
      limit: 3
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title {
            title
          }
          featuredImage {
            file {
              url
            }
            responsiveSizes {
              srcSet
              sizes
            }
          }
          blurb {
            blurb
            childMarkdownRemark {
              html
            }
          }
          body {
            childMarkdownRemark {
              html
            }
          }
          date
          author {
            name
            website
            biography {
              biography
              childMarkdownRemark {
                html
              }
            }
            profilePhoto {
              title
              file {
                url
              }
            }
          }
          category {
            title
          }
          comments
        }
      }
    }
  }
`;
