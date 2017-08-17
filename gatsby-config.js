const dotenv = require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Ryan Lindsey - Recent articles`,
    description: `Ryan Lindsey - ui engineer + manager, gadget lover & adrenaline junkie`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE}`,
        accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
};
