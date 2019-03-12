/* eslint-disable import/first */
require('es6-shim')
require('promise-polyfill')
require('utils/polifills')

import React from 'react'
import fav from './favicon.ico'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {}
}

// inject head script
const injectScript=`
(function() {
  var redirectPaths=[
    '/openpitrix',
    '/libconfd',
    '/metadata',
    '/metad',
    '/logger',
    '/notification',
    '/iam'
  ];
  
  if(redirectPaths.indexOf(location.pathname) > -1){
    location.replace('//github.com/openpitrix' + location.pathname);
  }
}())
`

const Html = ({
  htmlAttributes,
  headComponents,
  preBodyComponents,
  bodyAttributes,
  body,
  postBodyComponents,
}) => {
  let css
  if (process.env.NODE_ENV === `production`) {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: stylesStr }}
      />
    )
  }

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
        {css}
        <link rel="icon" href={fav} />
        <script dangerouslySetInnerHTML={{__html: injectScript}}></script>
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
        <script src="/smooth-scroll.polyfills.min.js" />
      </body>
    </html>
  )
}

export default Html
