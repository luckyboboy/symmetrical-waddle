/* 聊天窗口
 * 其中54px为回复框高度，css同
 * mode true为文本，false为语音
 * cancel true为取消录音，false为正常录音完毕并发送
 * 上拉超过50px为取消发送语音
 * status 0为normal，1为pressed，2为cancel
 * hud的尺寸是150*150
 */

var that;
Page({
  data: {
    message_list: [],
    scroll_height: wx.getSystemInfoSync().windowHeight - 54,
    page_index: 0,
    mode: true,
    cancel: false,
    status: 0,
    tips: ['按住 说话', '松开 结束', '取消 发送'],
    state: {
      'normal': 0,
      'pressed': 1,
      'cancel': 2
    },
    hud_top: (wx.getSystemInfoSync().windowHeight - 180) / 2,
    hud_left: (wx.getSystemInfoSync().windowHeight - 150) / 2,
  },
  onLoad: function (options) {
    that = this;
    wx.setNavigationBarTitle({
      title: options.title
    });
    that.setData({
      mpid: options.mpid,
      fans_id: options.to_uid,
      verify_type: options.verify_type
    });
    that.getMessages(options.mpid, options.to_uid, that.data.page_index);
    // that.getDemoMessages();
    // 存储会话双方id
    that.setData({
      mpid: options.mpid,
      to_uid: options.to_uid
    });
  },
  scrollToBottom: function () {
    that.setData({
      toView: 'row_' + (that.data.message_list.length - 1)
    });
  },
  getMessages: function (mpid, to_uid, page_index) {
    // 获取聊天记录
    http.post({
      uri: http.getChatList,
      param: {
        third_session: wx.getStorageSync('third_session'),
        mpid: mpid,
        fans_id: to_uid,
        page_index: page_index
      },
      success: function (data) {
        that.setData({
          message_list: data.data.concat(that.data.message_list)
        });
        // 滚动到底部，必须在网络请求后回调，不能在onLoad中请求
        if (page_index == 0) {
          that.scrollToBottom();
        }
      }
    });
  },
  reply: function (e) {
    var content = e.detail.value;
    if (content == '') {
      wx.showToast({
        title: '总要写点什么吧'
      });
      return ;
    }
    // 清空文本
    that.setData({
      content: ''
    });
    // var content = '以前就只能干等了，后来微信出了一个新接口，可以再次唤起授权窗口。原来如此，明白了';
    // 发送聊天文本
    http.post({
      uri: http.sendChat,
      param: {
        third_session: wx.getStorageSync('third_session'),
        mpid: that.data.mpid,
        fans_id: that.data.to_uid,
        msg_type: 'text',
        content: content
      },
      // 插入刚发的消息到聊天窗口，应该置于api请求成功时调用；由于接口返回的不是数据，而是对象，暂时注释
      success: function (data) {
        that.pushMessage(data.data);
        that.scrollToBottom();
        // 给出toast提示
        wx.showToast({
          title: data.msg
        });
      }
    });
  },
  pushMessage: function (messasge) {
    // 聊天记录添加一行刚刚发送的内容本身，更佳的方案是由服务端返回
    var message_list = that.data.message_list;
    message_list.push(messasge);
    that.setData({
      message_list: message_list
    });
  },
  loadMore: function () {
    var page_index = that.data.page_index;
    that.setData({
      page_index: ++page_index
    });
    that.getMessages(that.data.mpid, that.data.fans_id, that.data.page_index);
  },
  chooseImage: function () {
    // 选择图片供上传
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'], 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths);
        // 遍历多图
        tempFilePaths.forEach(function (tempFilePath) {
          that.upload(tempFilePath, 'image');
        });
      }
    })
  },
  preview: function (e) {
    // 当前点击图片的地址
    var src = e.currentTarget.dataset.src;
    // 遍历出使用images
    var images = [];
    that.data.message_list.forEach(function (messasge) {
      if (messasge != null && messasge.msg_type == 'image') {
        images.push(messasge.content);
      }
    });
    // 预览图片
    wx.previewImage({
      urls: images,
      current: src
    });
  },
  switchMode: function () {
    // 切换语音与文本模式
    that.setData({
      mode: !that.data.mode
    });
  },
  record: function () {
    // 录音事件
    wx.startRecord({
      success: function(res) {
        if (!that.data.cancel) {
          that.upload(res.tempFilePath, 'voice');
        }
      },
      fail: function(res) {
        console.log(res);
         //录音失败

      },complete: function (res) {
        console.log(res);
        
      }
    })
  },
  stop: function () {
    wx.stopRecord();
  },
  touchStart: function (e) {
    // 触摸开始
    var startY = e.touches[0].clientY;
    // 记录初始Y值
    that.setData({
      startY: startY,
      status: that.data.state.pressed
    });
  },
  touchMove: function (e) {
    // 触摸移动
    var movedY = e.touches[0].clientY;
    var distance = that.data.startY - movedY;
    // console.log(distance);
    // 距离超过50，取消发送
    that.setData({
      status: distance > 50 ? that.data.state.cancel : that.data.state.pressed
    });
  },
  touchEnd: function (e) {
    // 触摸结束
    var endY = e.changedTouches[0].clientY;
    var distance = that.data.startY - endY;
    // console.log(distance);
    // 距离超过50，取消发送
    that.setData({
      cancel: distance > 50 ? true : false,
      status: that.data.state.normal
    });
    // 不论如何，都结束录音
    that.stop();
  },
  upload: function (tempFilePath, type) {
    // 开始上传
    wx.showLoading({
      title: '发送中'
    });
    // 语音与图片通用上传方法
    var formData = {
      third_session: wx.getStorageSync('third_session'),
      mpid: that.data.mpid,
      fans_id: that.data.to_uid,
      msg_type: type,
    };
    console.log(tempFilePath);
    wx.uploadFile({
      url: http.HOST + http.sendChat,
      filePath: tempFilePath,
      header: {"content-type": "mutipart/form-data"},
      name: 'file',
      formData: formData,
      success: function(res){
        // 上传成功
        var data = JSON.parse(res.data)
        that.pushMessage(data.data);
        that.scrollToBottom();
        console.log(res);
        // 隐藏上传中提示框
        wx.hideLoading();
        // 提示上传成功
        // wx.showToast({
        //   title: data.msg
        // });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})


