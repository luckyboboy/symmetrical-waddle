// 云函数入口文件
const rp = require('request-promise')


// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  console.log(event)
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  console.log('开始上传')
  var fs = require('fs')
  console.log('接收的内容')
  var fileUrl = ctx.request.files.image.path
  console.log('文件路径')
  console.log(fileUrl)
  const result = await rp.post({
    url: 'https://api.remove.bg/v1.0/removebg',
    formData: {
      image_file: fs.createReadStream(fileUrl),
      size: 'auto'
    },
    headers: {
      'X-Api-Key': 'wkMhcc4TRNFpxjL79Kf8mMU1'
    },
    encoding: null
  })
  console.log(result)
  const body = result
  console.log('输出结果')
  console.log(body)
  const image = body.toString('base64')
  return {
    image
  }
}

// 添加
router.post('/upload', async (ctx, next) => {
  
})

module.exports = router
