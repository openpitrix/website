const path = require(`path`)
const debug=require('debug')('app');
const { createFilePath } = require(`gatsby-source-filesystem`)
const day=require('dayjs')
const React=require('react');
const {renderToString}=require('react-dom/server');
const {ServerStyleSheet}=require('styled-components');
const {createStore, Redoc} = require('redoc');

const config = require('./gatsby-config');
const apiDocOptions=require('./api-doc-options');

const getDocNodeFields = (slug = '')=> {
  const parts = slug.split('/').filter(Boolean)
  const [version, language] = parts

  return {
    // add /docs prefix when gen doc file
    slug: `/docs${slug}`,
    language,
    version
  }
}

const getBlogNodeFields = (slug='', createdAt=new Date)=> {
  const [language, file]=slug.split('/').filter(Boolean)

  return {
    slug: '/blog/' + [language, day(createdAt).format('YYYY/MM'), file].join('/'),
    language
  }
}

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
    // generate doc file node
    if(node.fileAbsolutePath.indexOf('/docs/') > 0){
      const slugDoc = createFilePath({ node, getNode, basePath: 'docs', trailingSlash: false })

      for(const [name, value] of Object.entries(getDocNodeFields(slugDoc))){
        if(name === 'slug'){
          debug(`Add doc slug: %s`, value);
        }

        createNodeField({node, name, value})
      }
    }

    if(node.fileAbsolutePath.indexOf('/blogs/') > 0) {
      // generate blog file node
      const slugBlog = createFilePath({node, getNode, basePath: 'blogs', trailingSlash: false})

      for(const [name, value] of Object.entries(getBlogNodeFields(slugBlog, node.frontmatter.date))){
        if(name === 'slug'){
          debug(`Add blog slug: %s`, value)
        }
        createNodeField({node, name, value})
      }
    }
  }
}

exports.onCreatePage = ({ page, actions, graphql }) => {
  const { createPage, deletePage } = actions
  if (page.path === '/docs/') {
    deletePage(page);
    const version = config.siteMetadata.version
    createPage({
      ...page,
      context: {
        latestVersion: `v${version}-zh-CN`,
      }
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // generate page for docs
  const genAllDocs = new Promise((resolve, reject) => {
    graphql(`{
        docs: allMarkdownRemark(filter: {fields: {slug: {regex: "/^\/docs\//"}}}) {
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

      const {edges}=res.data.docs;

      edges.forEach(({ node }) => {
        const { version, language, slug } = node.fields

        createPage({
          path: slug,
          component: path.resolve(`./src/templates/doc-detail.js`),
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

  const genAllBlogs = new Promise((resolve, reject)=> {
    graphql(`{
        blogs: allMarkdownRemark(filter: {fields: {slug: {regex: "/^\/blog\//"}}}) {
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

      const {edges}=res.data.blogs;

      edges.forEach(({ node }) => {
        const { language, slug } = node.fields

        createPage({
          path: slug,
          component: path.resolve(`./src/templates/blog-detail.js`),
          context: {
            slug,
            language,
            id: `${slug}-${language}`
          }
        });
      })

      resolve()
    })
  })

  const genAllAPI = new Promise((resolve) => {
    const specJson=require('./api.swagger.json');
    createStore(specJson, './api.swagger.json', apiDocOptions).then(store=> {
      const sheet = new ServerStyleSheet();
      const html=renderToString(sheet.collectStyles(React.createElement(Redoc, {store})));
      const css=sheet.getStyleTags();

      store.toJS().then(state=> {
        createPage({
          path: `/api/`,
          component: path.resolve(`./src/templates/api.js`),
          context: {
            html,
            css,
            state
          },
        })

        resolve()
      })
    })
  })

  return Promise.all([genAllDocs, genAllBlogs, genAllAPI])
}
