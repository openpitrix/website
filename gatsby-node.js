const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    const parts = slug.split('/').filter(p => !!p)

    const [version, language] = parts

    createNodeField({ node, name: `slug`, value: slug, })
    createNodeField({ node, name: `language`, value: language, })
    createNodeField({ node, name: `version`, value: version, })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators
  return new Promise(resolve => {
    graphql(`
      {
        pages: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                language
                version
              }
            }
          }
        }
      }
    `).then(({ data: { pages: { edges } } }) => {
      createRedirect({
        fromPath: `/`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: 'home'
      })

      edges.forEach(({ node }) => {
        const { version, language, slug } = node.fields
        createPage({
          path: slug,
          component: path.resolve(`./src/templates/markdown.js`),
          context: {
            slug: slug,
            version: version,
            id: `${version}-${language}`
          }
        });
      })

      resolve()
    })
  })
}
