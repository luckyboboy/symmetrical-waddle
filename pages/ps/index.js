Page({
  data: {
    url: '',
    origin: ''
  },
  onTap() {
    // 上传或更换菜品图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        var tempFilePaths = res.tempFilePaths
        const file = tempFilePaths[0]
        this.setData({
          origin: file
        })
        console.log(file)
        wx.uploadFile({
          url: 'http://localhost:4114/ps/upload', //仅为示例，非真实的接口地址
          filePath: file,
          name: 'image',
          success: res => {
            const data = res.data
            let url = 
              'data:image/png;base64,' + data
            this.setData({
              url: url
            })
            //do something
          },
          fail(err) {
            console.log('请求失败')
            console.log(err)
          }
        })
      }
    })
  }
})
