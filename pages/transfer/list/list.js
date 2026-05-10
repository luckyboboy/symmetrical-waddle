Page({
  data: {
    scrollHeight: wx.getSystemInfoSync().windowHeight + 49, // 49是底部栏高度，视情况而加
    letters: 'ABCDEFGH'
  },
  transfer: function (e) {
    let letter = e.currentTarget.dataset.letter
    this.setData({
      toView: letter
    })
  }
})