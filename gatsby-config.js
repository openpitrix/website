module.exports = {
  siteMetadata: {
    title: 'OpenPitrix',
    keywords: 'openpitrix, openpitrix.io, multi-cloud, application management, kubernetes',
    version: '0.4',
    description: 'openpitrix official site',
    apiDocuments: [
      {
        version: '0.4',
        swaggerUrls: [
          {
            name: 'openpitrix',
            url: './api.swagger.json',
          }
        ]
      }
    ]
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // {
          //   resolve: "gatsby-remark-images",
          //   options: {
          //     maxWidth: 690
          //   }
          // },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-format"
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `docs`,
        path: `${__dirname}/docs/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blogs`,
        path: `${__dirname}/blogs/`,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        include: /assets/
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: '#8454cd',
        showSpinner: true
      }
    },
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    // "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-json",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "OpenPitrix",
        short_name: "openpitrix",
        start_url: "/",
        background_color: "#f9fafb",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "./static/logo.svg", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
  ],
}
