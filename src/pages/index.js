import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import {
  space,
  width,
  height,
  color,
  fontSize,
  responsiveStyle,
} from "styled-system";
import { Flex, Box, Grid } from "grid-styled";
import { rem } from "polished";
import breakpoint from "../styles/breakpoints";
import theme from "../styles/theme";
import Icon from "../components/icons";
import Container from "../components/container";
import Button from "../components/button";
import {
  ProfilePhoto,
  AuthorName,
  Tagline,
  RecentArticles,
  ArticleSeparated,
  ArticleLink,
  FeaturedImage,
  Thumbnail,
  ArticlePreview,
  ArticleDate,
  ArticleTitle,
  ArticleBlurb,
  ReadMore,
} from "../styles/global";

export default class IndexPage extends Component {
  render() {
    const meta = this.props.data.site.siteMetadata;
    const recentArticles = this.props.data.recentArticles.edges;
    const {
      name: authorName,
      biography: { biography: tagline },
      profilePhoto,
    } = this.props.data.authors.edges[0].node;

    return (
      <Container>
        <Helmet>
          <title>{`Recent articles by ${authorName} - ${tagline}`}</title>
          <meta
            property="og:title"
            content={`Recent articles by ${authorName} - ${tagline}`}
          />
          <meta property="og:site_name" content="pixelsonly" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.pixelsonly.com" />
          <meta
            property="og:image"
            content={`https:${profilePhoto.resize.src}`}
          />
          <meta property="og:image:width" content={profilePhoto.resize.width} />
          <meta
            property="og:image:height"
            content={profilePhoto.resize.height}
          />
          <meta property="og:locale" content="en_US" />
          <meta property="twitter:site" content="@pixelsonly" />
          <meta
            property="twitter:title"
            content={`Recent articles by ${authorName} - ${tagline}`}
          />
          <link rel="canonical" href="https://www.pixelsonly.com" />
        </Helmet>
        <Flex justifyContent={["center"]} flexDirection={["column"]}>
          <Box
            width={[1]}
            px={[2, 2, 0]}
            pt={[2]}
            pb={[3]}
            itemScope
            itemType="http://schema.org/Person"
          rel="author">
            <ProfilePhoto is="picture">
              <source
                media={profilePhoto.sizes.sizes}
                srcSet={profilePhoto.sizes.srcSet}
              />
              <img
                src={`${profilePhoto.sizes.src}&r=1000`}
                itemProp="image"
                alt={profilePhoto.description}
              />
            </ProfilePhoto>
            <AuthorName itemProp="name" mb={[0]}>
              {authorName}
            </AuthorName>
            <Tagline itemProp="jobTitle">{tagline}</Tagline>
          </Box>
          <Box width={[1]}>
            <RecentArticles fontSize={[2]} mb={[2]} px={[2, 2, 0]}>
              Recent Articles
            </RecentArticles>
            {recentArticles.slice(0, 1).map((article, i) => {
              const {
                node: {
                  id,
                  title: { title: title },
                  slug,
                  featuredImage,
                  blurb: { blurb: blurb },
                  date,
                  rawDate,
                  category: { title: category },
                },
              } = article;
              return (
                <article
                  itemScope
                  itemType="http://schema.org/BlogPosting"
                  key={i}>
                  <ArticleLink to={`/articles/${slug}`} title={title}>
                    <FeaturedImage
                      src={featuredImage.resize.src}
                      width={featuredImage.resize.width}
                      height={featuredImage.resize.height}
                      alt={featuredImage.title}
                      itemProp="image"
                    />
                    <Flex
                      justifyContent={["flex-start"]}
                      flexDirection={["column"]}
                      px={[2]}
                      pb={[3, 4]}>
                      <ArticlePreview
                        width={[1]}
                        mt={[-3, -3, "-72px"]}
                        px={[1, 2]}
                        py={[1, 2]}>
                        <ArticleDate
                          fontSize={[0]}
                          m={[0]}
                          p={[0]}
                          itemProp="datePublished"
                          content={date}>
                          <FormattedDate
                            value={rawDate}
                            year="numeric"
                            month="long"
                            day="2-digit"
                          />
                        </ArticleDate>
                        <span itemProp="dateModified" content={date} />
                        <span itemProp="author" content={authorName} />
                        <span itemProp="publisher" content={authorName} />
                        <ArticleTitle
                          fontSize={[3, 4]}
                          my={[1]}
                          mb={[1]}
                        itemProp="headline">
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
          <Box width={[1]}>
            {recentArticles.slice(1).map((article, i) => {
              const {
                node: {
                  id,
                  title: { title: title },
                  slug,
                  featuredImage,
                  thumbnail,
                  blurb: { blurb: blurb },
                  date,
                  rawDate,
                  category: { title: category },
                },
              } = article;
              return (
                <ArticleSeparated
                  pt={[2]}
                  itemScope
                  itemType="http://schema.org/BlogPosting"
                  key={i}>
                  <ArticleLink to={`/articles/${slug}`} title={title}>
                    <Flex px={[2]}>
                      <Box w={[0.3, 0.2]} pr={[1, 2]} pb={[3]}>
                        <Thumbnail
                          src={thumbnail.responsiveSizes.src}
                          alt={thumbnail.title}
                          width={300}
                          height={300}
                          itemProp="image"
                        />
                      </Box>
                      <Box w={[0.7, 0.8]} px={[1]} pt={[1, 2]} pb={[2]}>
                        <ArticleDate
                          fontSize={[0]}
                          m={[0]}
                          px={[0]}
                          itemProp="datePublished"
                          content={date}>
                          <FormattedDate
                            value={rawDate}
                            year="numeric"
                            month="long"
                            day="2-digit"
                          />
                        </ArticleDate>
                        <span itemProp="dateModified" content={date} />
                        <span itemProp="author" content={authorName} />
                        <ArticleTitle
                          fontSize={[2, 3]}
                          mb={[1]}
                        itemProp="headline">
                          {title}
                        </ArticleTitle>
                        <ArticleBlurb
                          mt={[0]}
                          mb={[1]}
                          fontSize={[0, 1]}
                        itemProp="description">
                          {blurb}
                        </ArticleBlurb>
                        <ReadMore>Read more</ReadMore>
                      </Box>
                    </Flex>
                  </ArticleLink>
                </ArticleSeparated>
              );
            })}
          </Box>
          <Box width={[1]} px={[2, 2, 0]} pt={[2]} pb={[4]}>
            <Button to={`/articles`} title="More Articles">
              More Articles
            </Button>
          </Box>
        </Flex>
      </Container>
    );
  }
}

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
            title
            description
            sizes(maxWidth: 180, maxHeight: 180, quality: 85) {
              src
              srcSet
              sizes
            }
            resize(width: 600, quality: 85, jpegProgressive: true) {
              src
              width
              height
            }
          }
        }
      }
    }
    recentArticles: allContentfulPost(
      limit: 4
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
            title
            file {
              url
            }
            responsiveSizes(
              maxWidth: 900
              maxHeight: 450
              quality: 85
              resizingBehavior: FILL
            ) {
              src
              srcSet
              sizes
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
          thumbnail: featuredImage {
            title
            responsiveSizes(
              maxWidth: 300
              maxHeight: 300
              quality: 85
              resizingBehavior: FILL
            ) {
              src
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
          date(formatString: "YYYY-MM-DD")
          rawDate: date
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
