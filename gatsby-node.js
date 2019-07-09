const path = require(`path`)
const debug=require('debug')('app');
const { createFilePath } = require(`gatsby-source-filesystem`)
const day=require('dayjs')
const React=require('react');
const {renderToString}=require('react-dom/server');
const {ServerStyleSheet}=require('styled-components');
const {loadAndBundleSpec, createStore, Redoc} = require('redoc');

const apiDocOptions={
  name: 'openpitrix',
  spec: './api.swagger.json'
}

const redocOptions={
  nativeScrollbars: true,
  hideDownloadButton: true,
  theme: {
    space: {
      unit: 4,
    },
    colors: {
      primary: {
        main: '#5628b4',
      },
      success: {
        main: '#29b565',
      },
      warning: {
        main: '#fabf3a',
      },
      error: {
        main: '#f04c41',
      },
      text: {
        primary: '#343945',
      },
      border: {
        dark: '#576075',
        light: '#8c96ad',
      },
      http: {
        get: '#29b565',
        post: '#0090ff',
        put: '#C660A0',
        options: '#d3ca12',
        patch: '#fabf3a',
        delete: '#f04c41',
        basic: '#a2a9be',
        link: '#31bbb6',
        head: '#c167e4',
      },
    },
    schema: {
      defaultDetailsWidth: '75%',
      labelsTextSize: '0.9em',
      nestingSpacing: '1em',
      nestedBackground: '#eff0f5',
      arrow: {
        size: '0.9em',
      },
    },
    typography: {
      fontSize: '12px',
      fontFamily: 'Roboto, sans-serif',
      smoothing: 'antialiased',
      optimizeSpeed: true,
      headings: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
        lineHeight: '1.168em',
      },
      code: {
        fontSize: '12px',
        fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace',
        color: '#eff0f5',
        backgroundColor: '#474e5d',
        wrap: false,
      },
    },
    menu: {
      width: '280px',
      backgroundColor: '#f9fafb',
      textColor: '#576075',
      groupItems: {
        textTransform: 'lowercase',
      },
    },
    rightPanel: {
      backgroundColor: '#343945',
      width: '40%',
      textColor: '#eff0f5',
    },
  },
}

const config = require('./gatsby-config');

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

  const genAllAPI = new Promise((resolve, reject) => {
    const {spec}=apiDocOptions;

    loadAndBundleSpec(spec).then(data => {
      createStore(data).then(store=> {
        const sheet = new ServerStyleSheet();
        const html=renderToString(sheet.collectStyles(React.createElement(Redoc, {store, options: redocOptions})));
        const css=sheet.getStyleTags();

        createPage({
          path: `/api/`,
          component: path.resolve(`./src/templates/api.js`),
          context: {
            html,
            css
          },
        })

        resolve(data)
      });

    })

  })

  return Promise.all([genAllDocs, genAllBlogs, genAllAPI])
}
