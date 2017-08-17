import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

class IndexPage extends Component {
  render() {
    const meta = this.props.data.site.siteMetadata;
    const recentPosts = this.props.data.recentPosts.edges;

    return (
      <div>
        <Helmet
          title={meta.title}
          meta={[{ name: "description", content: `${meta.description}` }]}
        />
        <h2>Recent Posts</h2>
        <ul>
          {recentPosts.map(post =>
            <li key={post.node.id}>
              <Link
                to={`/articles/${post.node.slug}/`}
                title={post.node.title.title}>
                {post.node.title.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
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
    recentPosts: allContentfulPost(
      limit: 6
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
