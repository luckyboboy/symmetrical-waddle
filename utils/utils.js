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

module.exports = {
}
module.exports = {
  pageSize,
  systemInfo,
  formatResults
};