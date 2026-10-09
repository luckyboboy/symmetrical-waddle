// 初始化AV
App({
  onLaunch: function () {
    
  },
  share: function () {
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length - 1] //获取当前页面的对象
    let url = currentPage.route //当前页面url
    let options = currentPage.options //如果要获取url中所带的参数可以查看options
    if (Object.keys(options).length > 0) {
      url += '?'
      url += Object.keys(options).map(key => {
        return `${key}=${options[key]}`
      }).join('&')
    }
    // console.log(url)
    return url
  }
})