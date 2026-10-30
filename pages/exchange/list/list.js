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
    ticker: [],
    pageIndex: 0
  },
  onLoad() {
    this.loadData()
  },
  loadData() {
    let query = new Bmob.Query('Exchange')
    const pageSize = 1
    query.descending('createdAt')
    query.skip(this.data.pageIndex * pageSize)
    query.limit(pageSize)
    query.find().then(res => {
      res = utils.formatResults(res)
      wx.stopPullDownRefresh()
      let ticker = res[0].ticker
      let publishedAt = res[0].publishedAt
      console.log(res)
      this.setData({
        ticker: ticker,
        publishedAt: publishedAt
      })
    })
  },
  onPullDownRefresh: function () {
    // 下拉刷新
    this.loadData()
  },
  onShareAppMessage() {
		// 微信分享
		return {
			title: '外汇牌价',
			desc: '数据来自中国银行'
		}
	}
})