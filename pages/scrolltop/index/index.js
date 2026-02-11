Page({
  data: {
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    visual: false
  },
  goTop() {
    this.setData({
      scrollTop: 0
    })
  },
  scroll(e) {
    let scrollTop = e.detail.scrollTop
    // 如果大于一屏
    if (scrollTop > this.data.scrollHeight / 2) {
      this.setData({
        visual: true
      })
    } else {
      this.setData({
        visual: false
      })
    }
  }
})