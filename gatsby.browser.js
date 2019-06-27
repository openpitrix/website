export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`网站有版本更新，需要立即升级吗？`)

  if (answer) {
    window.location.reload()
  }
}
