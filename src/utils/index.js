import * as compareVersions from 'compare-versions'

export function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
}

export function formatAnchor(str) {
  return str
    .replace(/[:\.]/g, '')
    .split(' ')
    .join('-')
    .toLowerCase()
}

// versions from graphql data
export const sortVersions = (versions = [], desc = true) => {
  const res = versions.group.map(ver => ver.fieldValue).sort(compareVersions)
  if (desc) {
    return res.slice().reverse()
  }
  return res
}
