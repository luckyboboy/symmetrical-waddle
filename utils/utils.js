// 设备信息
// screenWidth, screenHeight, pixelRatio
var systemInfo = wx.getSystemInfoSync()

var pageSize = 20;
let formatResults = (res) => {
  if (res.length) {
    let newResults = res.map(item => {
      let result = item.attributes
      // console.log(item)
      result.objectId = item.id
      result.createdAt = item.createdAt
      // console.log(result)
      return result
    })
    return newResults
  } else {
    return res.attributes
  }
}

let signedParam = (param) => {
  const md5 = require('./md5')
  param.app_id = 2111312439
  let app_key = 'w2NDul0yGsGkf34G'
  // 签名
  let querystring =
    Object.keys(param)
    .filter(function (key) {
      return (
        param[key] !== undefined
      )
    })
    .sort()
    .map(function (key) {
      return key + '=' + encodeURIComponent(param[key])
    })
    .join('&') +
    '&app_key=' +
    app_key
  // console.log(querystring)
  let sign = md5(querystring).toUpperCase()
  param.sign = sign
  return param
}

let formatPrice = (price) => {
  if (price === 0) {
    return '面议'
  }
  return `￥ ${price}`
}

module.exports = {
  pageSize,
  systemInfo,
  formatResults,
  signedParam,
  formatPrice
};