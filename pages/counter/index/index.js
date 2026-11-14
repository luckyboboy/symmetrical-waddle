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
    // 1. 获取数据库引用
    const db = wx.cloud.database('mina')
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    db.collection('counter').where({
      publishInfo: this.data
    }).get({
      success(res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
        wx.showToast({
          title: '保存成功'
        })
        console.log(res)
      }
    })
  }
})