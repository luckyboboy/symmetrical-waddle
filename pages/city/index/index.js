const WxNotificationCenter = require('../utils/WxNotificationCenter')

Page({
  data: {
    cityName: ''
  },
  onLoad() {
    // 注册通知
    WxNotificationCenter.addNotification("citySelectedNotification", this.getCity, this);
  },
  getCity(cityName) {
    this.setData({
      cityName: cityName
    })
  }
})