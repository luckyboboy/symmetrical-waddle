// 农历转换库取自https://www.npmjs.com/package/solarlunar，感谢作者
const solarLunar = require('../utils/solarlunar.min')
const moment = require('../utils/moment.min')

Page({
  data: {
    weekIndices: ['日', '一', '二', '三', '四', '五', '六']
  },
  onLoad() {
    this.initData()
  },
  initData() {
    // 当年
    let currentYear = moment().format('YYYY')
    // 当月
    let currentMonth = moment().format('MM')
    // 渲染到页面
    this.setData({
      currentYear: currentYear,
      currentMonth: currentMonth
    })
    this.generateData()
  },
  previousYear() {
    // 上一年
    this.setData({
      currentYear: moment(`${this.data.currentYear}-${this.data.currentMonth}-01`).subtract(1, 'years').format('YYYY')
    })
    this.generateData()
  },
  previousMonth() {
    // 上一月
    let date = moment(`${this.data.currentYear}-${this.data.currentMonth}-01`).subtract(1, 'months')
    this.setData({
      currentMonth: date.format('MM'),
      currentYear: date.format('YYYY'),
    })
    this.generateData()
  },
  nextMonth() {
    // 下一月
    let date = moment(`${this.data.currentYear}-${this.data.currentMonth}-01`).add(1, 'months')
    this.setData({
      currentMonth: date.format('MM'),
      currentYear: date.format('YYYY'),
    })
    this.generateData()
  },
  nextYear() {
    // 下一年
    this.setData({
      currentYear: moment(`${this.data.currentYear}-${this.data.currentMonth}-01`).add(1, 'years').format('YYYY')
    })
    this.generateData()
  },
  generateData() {
    // 本月开始日期
    let startDayOfCurrentMonth = `${this.data.currentYear}-${this.data.currentMonth}-01`
    // 本月结束日期
    let endDayOfCurrentMonth = moment(startDayOfCurrentMonth).add(1, 'month').format('YYYY-MM-DD')
    // 本月共几天
    let dayCount = moment(endDayOfCurrentMonth).diff(moment(startDayOfCurrentMonth), 'days')
    // console.log(dayCount)
    // 计算本月1号是周几
    let offset = moment(startDayOfCurrentMonth).days()
    // 填充空字符串，使得本周向右偏移，代替CSS pull-right操作，
    let daysArray = Array(offset).fill('')
    for (let i = 1; i <= dayCount; i++) {
      daysArray.push(i)
    }
    // 换算农历
    let lunarArray = daysArray.map(item => {
      if (item != '') {
        const lunar2solarData = solarLunar.solar2lunar(this.data.currentYear, this.data.currentMonth, item); // 输入的日子为农历
        // console.log(lunar2solarData)
        let dayCn = lunar2solarData.dayCn == '初一' ? lunar2solarData.monthCn : lunar2solarData.dayCn
        return dayCn
      }
      return item
    })
    this.setData({
      daysArray: daysArray,
      lunarArray: lunarArray
    })
    // console.log(daysArray)
  }
})