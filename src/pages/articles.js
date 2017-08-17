import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

class ArticlesPage extends Component {
  render() {
    const meta = this.props.data.site.siteMetadata;

    return (
      <div>
        <p>All articles</p>
      </div>
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
  }
`;
