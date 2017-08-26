import React, { Component } from "react";
import Link from "gatsby-link";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import { Flex, Box, Grid } from "grid-styled";
import { space, fontSize, color, width, height } from "styled-system";
import { rem } from "polished";
import ReactDisqusComments from "react-disqus-comments";
import theme from "../styles/theme";
import breakpoint from "../styles/breakpoints";
import Container from "../components/container";
import { Breadcrumbs, ArticleDate, FeaturedImage } from "../styles/global";

const Article = styled(Box)`${space} ${width};`;

const ArticleHeader = styled(Flex)`
  ${space} ${width};
  text-align: center;
`;

const ArticleTitle = styled.h1`
  ${space} ${fontSize};
  font-family: ${theme.fonts.serif};
  font-weight: 700;
`;

const Author = styled(Flex)`
  ${space} ${width};
  background-color: ${theme.colors.white};
  border-bottom: ${rem("2px")} solid ${theme.colors.lightGray};
  text-align: center;
`;

const AuthorPhoto = styled.img`
  ${space} ${width} ${height};
  width: ${rem("72px")};
  height: ${rem("72px")};
  border-radius: ${rem("10000px")};
`;

const AuthorName = styled.figcaption`
  ${space} ${fontSize};
  font-family: ${theme.fonts.serif};
  font-weight: 700;
  color: ${theme.colors.mediumGray};
`;

const AuthorBio = styled.p`
  ${space} ${fontSize};
  color: ${theme.colors.gray};
`;

const ArticleBody = styled(Box)`
  ${space} ${width};

  h2,
  h3,
  h4 {
    margin-bottom: 0;
  }

  p, ul, ol {
    margin-top: ${rem("8px")};
    color: ${theme.colors.mediumGray};
    line-height: ${rem("22px")};
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  figure {
    margin: ${rem("16px")} 0 ${rem("32px")} 0;
    padding: 0;

    figcaption {
      padding: ${rem("8px")};
      border: ${rem("1px")} solid ${theme.colors.lightGray};
      border-top: 0;
      font-size: ${rem("14px")};
    }
  }

  a {
    color: ${theme.colors.pink};
  }

  a:hover {
    color: ${theme.colors.darkGray};
  }

  .gatsby-highlight pre[class*="language-"] {
    background-color: ${theme.colors.darkGray};
    border-radius: 0;
    font-size: ${rem("14px")};
    text-shadow: none;
  }
`;

const ArticleComments = styled(Box)`
  ${space} ${width};
`;

export default class ArticleTemplate extends Component {
  static propTypes = { data: PropTypes.object.isRequired };

  render() {
    const {
      id,
      slug,
      date,
      rawDate,
      featuredImage,
      ogImage,
      comments,
      title: { title: title },
      blurb: { childMarkdownRemark: { html: blurb } },
      body: { childMarkdownRemark: { html: body } },
      author: [
        {
          name: authorName,
          profilePhoto: profilePhoto,
          biography: { biography: authorBio },
        },
      ],
      category: { title: category },
    } = this.props.data.article;

    return (
      <Container>
        <Helmet>
          <title>
            {title}
          </title>
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="pixelsonly" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://www.pixelsonly.com/articles/${slug}`}
          />
          <meta property="og:image" content={`https:${ogImage.resize.src}`} />
          <meta property="og:image:width" content={ogImage.resize.width} />
          <meta property="og:image:height" content={ogImage.resize.height} />
          <meta property="og:locale" content="en_US" />
          <meta property="twitter:site" content="@pixelsonly" />
          <meta property="twitter:title" content={title} />
          <link
            rel="canonical"
            href={`https://www.pixelsonly.com/articles/${slug}`}
          />
        </Helmet>
        <Article
          w={[1]}
          flex={["1 1 auto"]}
          is="article"
          itemScope
          itemType="http://schema.org/BlogPosting">
          <ArticleHeader direction={["column"]} is="header">
            <ArticleDate
              f={[0, 1]}
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
            <span itemProp="publisher" content={authorName} />
            <ArticleTitle px={[2]} itemProp="headline">
              {title}
            </ArticleTitle>
            <nav>
              <Breadcrumbs
                is="ul"
                direction="row"
                justify="flex-start"
                m={[0]}
                px={[2, 2, 0]}
                pb={[2]}
                fontSize={[1]}>
                <li>
                  <Link to={`/`}>Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link to={`/articles`}>Articles</Link>
                </li>
              </Breadcrumbs>
            </nav>
            <FeaturedImage
              src={featuredImage.resize.src}
              width={featuredImage.resize.width}
              height={featuredImage.resize.height}
              alt={featuredImage.title}
              itemProp="image"
            />
            <Author
              is="figure"
              direction="column"
              mt={[-3, -3, "-72px"]}
              mx={[2]}
              mb={[0]}
              pt={[0, 1]}
              pb={[2]}
              itemScope
              itemType="http://schema.org/Person"
              itemProp="author"
              rel="author">
              <AuthorPhoto
                src={profilePhoto.resize.src}
                alt={profilePhoto.title}
                itemProp="image"
                width={profilePhoto.resize.width}
                height={profilePhoto.resize.height}
                my={[1]}
                mx={["auto"]}
              />
              <AuthorName f={[2, 3]} itemProp="name">
                {authorName}
              </AuthorName>
              <AuthorBio
                p={[0]}
                mx={[0]}
                mt={[1]}
                mb={[0]}
                f={[0, 0, 1]}
                itemProp="jobTitle">
                {authorBio}
              </AuthorBio>
            </Author>
          </ArticleHeader>
          <ArticleBody
            w={[1]}
            px={[2, 2, 0]}
            py={[2]}
            is="main"
            itemProp="articleBody"
            itemProp="mainEntityOfPage"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <ArticleComments w={[1]} px={[2, 2, 0]} py={[3]} itemProp="comment">
            <ReactDisqusComments
              shortname="pixelsonly-github-io"
              identifier={slug}
              title={title}
              url={`https://www.pixelsonly.com/articles/${slug}`}
            />
          </ArticleComments>
        </Article>
      </Container>
    );
  }
}

export const articleQuery = graphql`
  query articleQuery($id: String!) {
    article: contentfulPost(id: { eq: $id }) {
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
          quality: 80
          resizingBehavior: FILL
        ) {
          src
          srcSet
          sizes
        }
        resize(width: 1200, height: 630, quality: 85, jpegProgressive: true) {
          src
          width
          height
        }
      }
      ogImage: featuredImage {
        resize(width: 1200, height: 630, quality: 85, jpegProgressive: true) {
          src
          width
          height
        }
      }
      blurb {
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
          resize(width: 144, height: 144, quality: 85, jpegProgressive: true) {
            src
            width
            height
          }
        }
      }
      category {
        title
      }
      comments
    }
  }
`;
