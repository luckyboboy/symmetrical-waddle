Page({
  data: {
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    visual: false,
    animation: ''
  },
  goTop() {
    this.setData({
      scrollTop: 0
    })
  },
  scroll(e) {
    let scrollTop = e.detail.scrollTop
    // 如果大于半屏
    if (scrollTop > this.data.scrollHeight / 2) {
      this.setData({
        visual: true,
        animation: 'fadeIn'
      })
    } else {
      this.setData({
        animation: 'fadeOut'
      })
      // setTimeout(() => {
      //   this.setData({
      //     visual: false
      //   })
      // }, 1000)
    }
  }
})