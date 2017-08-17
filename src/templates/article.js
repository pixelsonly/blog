import React, { Component } from "react";
import Link from "gatsby-link";
import * as PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

const propTypes = {
  data: PropTypes.object.isRequired,
};

class ArticleTemplate extends Component {
  render() {
    const article = this.props.data.article;

    const {
      id,
      slug,
      title: { title },
      featuredImage,
      blurb: { childMarkdownRemark: { html: blurb } },
      body: { childMarkdownRemark: { html: body } },
      date,
      author: [{ name: authorName }],
      category: { title: category },
      comments,
    } = article;

    return (
      <article>
        <h1>
          {title}
        </h1>
        <time>
          <FormattedDate
            value={date}
            year="numeric"
            month="long"
            day="2-digit"
          />
        </time>
        <p>
          {authorName}
        </p>
        <main dangerouslySetInnerHTML={{ __html: body }} />
      </article>
    );
  }
}

ArticleTemplate.propTypes = propTypes;

export default ArticleTemplate;

export const articleQuery = graphql`
  query articleQuery($id: String!) {
    article: contentfulPost(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
      featuredImage {
        file {
          url
        }
        responsiveSizes(maxWidth: 1000, quality: 80) {
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
      date
      author {
        name
        website
        biography {
          childMarkdownRemark {
            html
          }
        }
        profilePhoto {
          title
          file {
            url
          }
          responsiveSizes(maxWidth: 600) {
            src
            srcSet
            sizes
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
