// 农历转换库取自https://www.npmjs.com/package/solarlunar，感谢作者yize

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
    // 生成年份选择器数据
    let yearArray = []
    for (let index = 1900; index < 2100; index++) {
      yearArray.push(String(index))
    }
    // 生成月份选择器数据
    let monthArray = []
    for (let index = 1; index <= 12; index++) {
      monthArray.push(index < 10 ? '0' + index : index)
    }
    // 渲染到页面
    this.setData({
      yearArray: yearArray,
      monthArray: monthArray
    })
    // 生成当前月份天数集合
    this.generateData()
  },
  // 切换年份
  bindYearChange: function (e) {
    this.setData({
      currentYear: this.data.yearArray[e.detail.value]
    })
    this.generateData()
  },
  // 切换月份
  bindMonthChange: function (e) {
    this.setData({
      currentMonth: this.data.monthArray[e.detail.value]
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
    let dateArray = []
    // 上一个月补足日期
    for (let index = offset; index > 0; index--) {
      dateArray.push(moment(startDayOfCurrentMonth).subtract(index, 'day').format('YYYY-MM-DD'))
    }
    // 本月日期
    for (let i = 1; i <= dayCount; i++) {
      let date = moment(`${this.data.currentYear}${this.data.currentMonth}${i}`, 'YYYYMMD').format('YYYY-MM-DD')
      dateArray.push(date)
    }
    // 下一个月补足日期
    let nextOffset = 7 - moment(endDayOfCurrentMonth).days()
    for (let index = 0; index < nextOffset; index++) {
      dateArray.push(moment(endDayOfCurrentMonth).add(index, 'day').format('YYYY-MM-DD'))
    }
    console.log(dateArray)
    // 换算农历
    let lunarArray = dateArray.map(item => {
      const lunar2solarData = solarLunar.solar2lunar(moment(item).format('YYYY'), moment(item).format('MM'), moment(item).format('DD')); // 输入的日子为农历
      // console.log(lunar2solarData)
      let dayCn = lunar2solarData.dayCn == '初一' ? lunar2solarData.monthCn : lunar2solarData.dayCn
      return dayCn
    })
    this.setData({
      daysArray: dateArray.map(item => {
        return moment(item).format('D')
      }),
      lunarArray: lunarArray
    })
    // 为picker计算当前年份月份所在yearArray的index
    this.setData({
      yearIndex: this.data.yearArray.indexOf(this.data.currentYear),
      monthIndex: this.data.monthArray.indexOf(this.data.currentMonth)
    })
    // console.log(daysArray)
  }
})