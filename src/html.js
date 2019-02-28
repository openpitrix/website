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
  } catch (e) {
    console.log(e)
  }
}

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
        {/*<link*/}
        {/*rel="stylesheet"*/}
        {/*href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"*/}
        {/*/>*/}
        {/*<script*/}
        {/*type="text/javascript"*/}
        {/*src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"*/}
        {/*/>*/}
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
