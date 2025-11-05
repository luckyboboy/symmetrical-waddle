// 农历转换库取自https://www.npmjs.com/package/solarlunar，感谢作者
const solarLunar = require('../utils/solarlunar.min')
const moment = require('../utils/moment.min')

Page({
  data: {
    weekIndices: ['日', '一', '二', '三', '四', '五', '六']
  },
  onLoad() {
    // const lunar2solarData = solarLunar.lunar2solar(2015, 8, 26); // 输入的日子为农历
    // console.log(lunar2solarData)
    // 当天日期
    let today = moment()
    // 当年
    let currentYear = today.format('YYYY')
    // 当月
    let currentMonth = today.format('MM')
    // 渲染到页面
    this.setData({
      currentYear: currentYear,
      currentMonth: currentMonth
    })
    // 本月开始日期
    let startDayOfCurrentMonth = `${currentYear}-${currentMonth}-01`
    // 计算本月1号是周几
    // console.log(moment(startDayOfCurrentMonth).days())
    // 本月结束日期
    let endDayOfCurrentMonth = moment(startDayOfCurrentMonth).add(1, 'month').format('YYYY-MM-DD')
    // 本月共几天
    let dayCount = moment(endDayOfCurrentMonth).diff(moment(startDayOfCurrentMonth), 'days')
    // console.log(dayCount)
    let daysArray = Array(moment(startDayOfCurrentMonth).days()).fill('')
    for (let i = 1; i <= dayCount; i++) {
      daysArray.push(i)
    }
    this.setData({
      daysArray: daysArray
    })
    // console.log(daysArray)
  }
})