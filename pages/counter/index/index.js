let moment = require('../../../utils/moment.min')
Page({
  data: {
    title: '记录',
    publishedAt: null
  },
  onLoad() {
    this.setData({
      publishedAt: moment().format('YYYY-MM-DD')
    })
  },
  bindDateChange(e) {
    let publishedAt = e.detail.value
    this.setData({
      publishedAt: publishedAt
    })
  },
  formSubmit(e) {
    let title = e.detail.value.title
    this.setData({
      title: title
    })
    wx.showToast({
      title: '保存成功'
    })
  }
})