const genSearchDocs=(edges=[])=> {
  return edges.map(({node})=> {
    const {fields}=node

    return {
      id: [fields.version, fields.slug].join('$$'),
      title: node.frontmatter.title,
      body: node.excerpt
    }
  })
}

module.exports={
  genSearchDocs
}