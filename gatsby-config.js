const dotenv = require("dotenv").config()

module.exports = {
  polyfill: false,
  siteMetadata: {
    title: `Recent articles`,
    description: `Ryan Lindsey - ui engineer + manager, gadget lover & adrenaline junkie`,
    externalLinks: {
      github: "https://github.com/pixelsonly",
      linkedin: "https://linkedin.com/in/pixelsonly",
      instagram: "https://www.instagram.com/pixelsonly/",
      twitter: "https://www.twitter.com/pixelsonly",
    },
    resume: {
      website: "https://represent.io/pixelsonly",
      pdf: "https://represent.io/pixelsonly/pdf",
    },
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
    `gatsby-plugin-react-next`,
  ],
}
