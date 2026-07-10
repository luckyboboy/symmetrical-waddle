const Bmob = require('../../../utils/bmob')
const utils = require('../../../utils/utils')
// 将db文件夹中的数据导入自己的bmob应用后，改成自己的Application ID以及REST API Key
Bmob.initialize(
  'de306fbe6cc874e2a1e234d70eb1b38d',
  '86463335436302c03ecb62318ef63aed'
)

Page({
  data: {
    taskList: [],
    pageIndex: 0
  },
  onLoad() {
    this.loadData()
  },
  loadData() {
    let query = new Bmob.Query('Task')
    const pageSize = utils.pageSize / 4
    query.descending('publishedAt')
    query.skip = this.data.pageIndex * pageSize
    query.limit = 4
    query.find().then(res => {
      wx.stopPullDownRefresh()
      let taskList = this.data.taskList
      taskList = taskList.concat(res.map(item => {
        item.set('formattedPrice', utils.formatPrice(item.get('price')))
        item.set('description', item.get('description').trim())
        return item
      }))
      this.setData({
        taskList: taskList
      })
    })
  },
  onPullDownRefresh: function () {
    // 下拉刷新
    this.initData()
    this.loadData()
  },
  onReachBottom() {
    let pageIndex = this.data.pageIndex
    pageIndex++
    this.setData({
      pageIndex: pageIndex
    })
    this.loadData()
  },
  initData() {
    this.setData({
      pageIndex: 0,
      taskList: []
    })
  }
})