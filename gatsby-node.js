const path = require(`path`)
const fs=require('fs')
const debug=require('debug')('app')
const { createFilePath } = require(`gatsby-source-filesystem`)
const {genSearchDocs}=require('./search')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, "src"),
        "node_modules"
      ],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `docs` })

    debug(`slug: %s`, slug);

    const parts = slug.split('/').filter(Boolean)
    const [version, language] = parts

    // add `/docs` prefix
    createNodeField({ node, name: `slug`, value: `/docs${slug}`, })
    createNodeField({ node, name: `language`, value: language, })
    createNodeField({ node, name: `version`, value: version, })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const genDocs = new Promise((resolve, reject) => {
    graphql(`{
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
    `).then(res=> {
      if(res.errors){
        reject(res.errors)
      }

      const {edges}=res.data.pages;

      edges.forEach(({ node }) => {
        const { version, language, slug } = node.fields
        createPage({
          path: slug,
          component: path.resolve(`./src/templates/pageDetail.js`),
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

  const genSearchIndex = new Promise((resolve, reject)=> {
    graphql(`{
        searchIndex: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                version
              }
              excerpt
              frontmatter {
                title
              }
            }
          }
        }
      }
    `).then(res=> {
      if(res.errors){
        reject(res.errors)
      }

      const rawData=res.data.searchIndex.edges || []
      const searchDocs=genSearchDocs(rawData)
      try{
        fs.writeFileSync(path.resolve(__dirname, 'docs/search-docs.json'), JSON.stringify(searchDocs, null, 2), 'utf-8')
        debug(`generate docs index successfully`)
      } catch(err){
        console.error('generate search docs failed: ', err.stack)
      }

      resolve(rawData)
    })
  })

  return Promise.all([genDocs, genSearchIndex])
}
