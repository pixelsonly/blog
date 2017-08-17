const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allContentfulPost(limit: 1000) {
            edges {
              node {
                id
                slug
                title {
                  title
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      const articleTemplate = path.resolve(`./src/templates/article.js`);

      _.each(result.data.allContentfulPost.edges, edge => {
        createPage({
          path: `/articles/${edge.node.slug}/`,
          component: slash(articleTemplate),
          context: { id: edge.node.id },
        });
      });
    });
    resolve();
  });
};
