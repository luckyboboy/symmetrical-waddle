// 引入腾讯地图组件
const QQMapWX = require('../utils/qqmap-wx-jssdk.min.js')
let getLocation = (cb) => {
  // 初始化腾讯地图
  const qqmapsdk = new QQMapWX({
    key: 'BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U'
  })
  // 调用接口
  qqmapsdk.reverseGeocoder({
    success: res => {
      cb(res.result.address_component.district)
    }
  })
}

module.exports = {
  getLocation
}