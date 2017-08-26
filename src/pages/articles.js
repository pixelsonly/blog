import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import { space, color, fontSize, responsiveStyle } from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem, borderRadius } from "polished";
import breakpoint from "../styles/breakpoints";
import theme from "../styles/theme";
import Icon from "../components/icons";
import Container from "../components/container";
import Button from "../components/button";
import {
  Breadcrumbs,
  PageTitle,
  ArticleLink,
  FeaturedImage,
  ArticlePreview,
  ArticleDate,
  ArticleTitle,
  ArticleBlurb,
  ReadMore,
} from "../styles/global";

class ArticlesPage extends Component {
  render() {
    const meta = this.props.data.site.siteMetadata;
    const articles = this.props.data.allArticles.edges;

    return (
      <Container>
        <Helmet>
          <title>
            Thoughts on technology, people management, &amp; adventures&hellip;
          </title>
          <meta
            property="og:title"
            content={`Thoughts on technology, work, and adventuring&hellip;`}
          />
          <meta property="og:site_name" content="pixelsonly" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.pixelsonly.com/articles"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="twitter:site" content="@pixelsonly" />
          <meta
            property="twitter:title"
            content={`Thoughts on technology, work, and adventuring&hellip;`}
          />
          <link rel="canonical" href="https://www.pixelsonly.com/articles" />
        </Helmet>
        <Flex column>
          <Box width={[1]}>
            <PageTitle fontSize={[5]} px={[2, 2, 4]} mt={[3]} mb={[3]}>
              Thoughts on technology, work, and adventuring&hellip;
            </PageTitle>
            <nav>
              <Breadcrumbs
                is="ul"
                direction="row"
                justify="flex-start"
                m={[0]}
                px={[1, 1, 0]}
                pb={[2]}
                fontSize={[1]}>
                <li>
                  <Link to={`/`}>Home</Link>
                </li>
                <li>/</li>
              </Breadcrumbs>
            </nav>
          </Box>
          <Box width={[1]} pb={[2]}>
            {articles.map((article, i) => {
              const {
                node: {
                  id,
                  title: { title: title },
                  slug,
                  featuredImage,
                  blurb: { blurb: blurb },
                  date,
                  category: { title: category },
                },
              } = article;
              return (
                <article
                  key={id}
                  itemScope
                  itemType="http://schema.org/Article">
                  <ArticleLink to={`/articles/${slug}`}>
                    <FeaturedImage
                      src={featuredImage.resize.src}
                      alt={featuredImage.title}
                      width={featuredImage.resize.width}
                      height={featuredImage.resize.height}
                      itemProp="image"
                    />
                    <Flex justify={["flex-start"]} column px={[1, 2]} pb={[3]}>
                      <ArticlePreview
                        width={[1]}
                        mt={[-4]}
                        px={[1, 2]}
                        py={[1, 2]}>
                        <ArticleDate
                          f={[0, 1]}
                          m={[0]}
                          p={[0]}
                          itemProp="datePublished"
                          content={date}>
                          <FormattedDate
                            value={date}
                            year="numeric"
                            month="long"
                            day="2-digit"
                          />
                        </ArticleDate>
                        <ArticleTitle my={[1]} itemProp="headline">
                          {title}
                        </ArticleTitle>
                        <ArticleBlurb
                          mt={[0]}
                          mb={[1]}
                          fontSize={[1]}
                          itemProp="description">
                          {blurb}
                        </ArticleBlurb>
                        <ReadMore>Read more</ReadMore>
                      </ArticlePreview>
                    </Flex>
                  </ArticleLink>
                </article>
              );
            })}
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default ArticlesPage;

export const pageQuery = graphql`
  query ArticlesPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allArticles: allContentfulPost(
      limit: 1000
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
            responsiveSizes(maxWidth: 900, quality: 80) {
              src
              srcSet
              sizes
            }
            responsiveResolution(width: 400, height: 400) {
              src
              srcSet
              width
              height
            }
            resize(
              width: 1200
              height: 630
              quality: 85
              jpegProgressive: true
            ) {
              src
              width
              height
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
          date(formatString: "YYYY-MM-DD")
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
