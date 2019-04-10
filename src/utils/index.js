import * as compareVersions from 'compare-versions'
import day from 'dayjs'
import 'dayjs/locale/zh-cn'

day.locale('zh-cn')

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

export const formatTime=(time=new Date, format=`YYYY/MM/DD HH:mm:ss`)=> {
  const dt=day(time)

  if(!dt.isValid()){
    throw Error(`invalid time: ${time}`)
  }

  return dt.format(format)
}
