Page({
  data: {
    scrollHeight: wx.getSystemInfoSync().windowHeight
  },
  goTop () {
    this.setData({
      scrollTop: 0
    })
  }
})