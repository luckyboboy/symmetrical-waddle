const utils = require('../../../utils/utils')
Page({
  choose() {
    wx.chooseImage({
      success: (res) => {
        let file = res.tempFilePaths[0]
        this.setData({
          file: file
        })
        let base64 = wx.getFileSystemManager().readFileSync(file, 'base64')
        // console.log(base64)
        let image = 'data:image/png;base64,' + base64
        this.scan(base64)
        wx.showLoading({
          title: '正在识别'
        })
      }
    })
  },
  scan(image) {
    let params = {
      image: image,
      time_stamp: (Date.now() / 1000).toFixed(),
      nonce_str: Math.random()
    }
    this.upload(utils.signedParam(params))
  },
  upload(params) {
    // console.log(params)
    wx.request({
      url: 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_creditcardocr', // 仅为示例，并非真实的接口地址
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.data.item_list.length === 0) {
          wx.showModal({
            title: '识别失败',
            content: '这可能不是一张银行',
            showCancel: false
          })
        } else {
          this.setData({
            info: res.data.data.item_list
          })
        }
      }
    })
  },
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.str,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  }
})