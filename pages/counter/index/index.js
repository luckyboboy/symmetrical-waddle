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
    this.save()
  },
  save() {
    const db = wx.cloud.database()
    db.collection('counter').add({
      data: {
        title: this.data.title,
        publishedAt: this.data.publishedAt
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})