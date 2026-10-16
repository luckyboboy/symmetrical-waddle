const Bmob = require('../utils/bmob')
const moment = require('../../../utils/moment.min')
const utils = require('../../../utils/utils')
// 将db文件夹中的数据导入自己的bmob应用后，改成自己的Application ID以及REST API Key
Bmob.initialize(
  'de306fbe6cc874e2a1e234d70eb1b38d',
  '86463335436302c03ecb62318ef63aed'
)

Page({
  data: {
    taskList: [],
    pageIndex: 0,
    loadingTip: '上拉加载更多'
  },
  onLoad() {
    this.loadData()
  },
  loadData() {
    let query = new Bmob.Query('Task')
    const pageSize = utils.pageSize
    query.descending('createdAt')
    query.skip(this.data.pageIndex * pageSize)
    query.limit(pageSize)
    query.find().then(res => {
      wx.stopPullDownRefresh()
      let taskList = this.data.taskList
      if (res.length === 0) {
        this.setData({
          loadingTip: '已经没有更多'
        })
      } else {
        res = utils.formatResults(res)
        taskList = taskList.concat(res.map(item => {
          item.price = utils.formatPrice(item.price)
          item.publishedAt = moment(item.publishedAt).format('YYYY-MM-DD')
          return item
        }))
        this.setData({
          taskList: taskList
        })
      }
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
  },
  copy(e) {
    wx.setClipboardData({
      data: this.data.taskList[e.currentTarget.dataset.index].href,
      success: function (res) {
        wx.showToast({
          title: '链接复制成功'
        })
      }
    })
  },
  onShareAppMessage() {
		// 微信分享
		return {
			title: '任务大厅',
			desc: '小程序外包项目'
		}
	}
})