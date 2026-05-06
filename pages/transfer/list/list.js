Page({
  data: {
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    letters: 'ABCDEFGH'
  },
  transfer: function (e) {
    let letter = e.currentTarget.dataset.letter
    this.setData({
      toView: letter
    })
  }
})