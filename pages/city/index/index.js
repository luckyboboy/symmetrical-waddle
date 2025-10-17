const WxNotificationCenter = require('../utils/WxNotificationCenter')
const utils = require('../utils/utils')

Page({
  data: {
    cityName: ''
  },
  onLoad() {
    // 注册通知
    WxNotificationCenter.addNotification("citySelectedNotification", this.getCity, this)
    this.getLocation()
  },
  getCity(cityName) {
    this.setData({
      cityName: cityName
    })
  },
  getLocation() {
		utils.getLocation(geoCity => {
			this.setData({
				cityName: geoCity
			})
		})
	}
})