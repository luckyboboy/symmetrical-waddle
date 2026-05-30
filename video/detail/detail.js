/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @author 黄秀杰
 */

var Bmob = require('../../utils/bmob.js');
//获取应用实例
var app = getApp()
var that;
Page({
    data: {
        chapterIndex: 0,
        visual: true,
        playerHeight: wx.getSystemInfoSync().windowWidth * 0.625
    },
    onLoad: function (options) {
        that = this;
        that.findCourseDetail(options.objectId);
        this.setData({
            objectId: options.objectId
        })
    },
    findCourseDetail: function (objectId) {
        // 找出该课程对象
        var query = new Bmob.Query('Course');
        query.get(objectId).then(function (course) {
            // 持有course数据
            that.setData({
                course: course
            });
            // 获取教程标题
            var name = course.get('title');
            wx.setNavigationBarTitle({
                title: name
            });
            that.findChapterById(objectId);
        });

        
    },
    findChapterById: function(objectId) {
        // 获取全部章节
        var query = new Bmob.Query('Chapter');
        query.ascending('priority');
        query.equalTo('course', Bmob.Object.createWithoutData('Course', objectId));
        // 查询到当前教程全部章节
        query.find().then(function (chapterObjects) {
            that.setData({
                chapterObjects: chapterObjects
            });
        });
    },
    chapterTapped: function (e) {
        // 点击某一章节
        const index = e.currentTarget.dataset.index;
        that.setData({
            chapterIndex: index
        });
    },
    chapterEnded: function () {
        // 监听播放完毕
        var chapterIndex = that.data.chapterIndex;
        // 当章节数未超过总章节数时
        if (chapterIndex >= that.data.chapterObjects.length - 1) {
            return;
        }
        // 章节序号迭加1
        that.setData({
            chapterIndex: ++chapterIndex
        });
    },
    onShareAppMessage: function () {
        // 微信分享
        return {
            title: that.data.course.get('name'),
            desc: '灵动云课-全栈开发者的网络课堂',
            path: '/pages/course/detail/detail?objectId=' + that.data.course.get('objectId')
        }
    },
    coverLoad: function (e) {
        // 监听封面图片加载事件，得到海报高度，最终取到top/left定位
        var height = getApp().screenWidth / (e.detail.width / e.detail.height);
        // 按钮宽度
        const payButtonWidth = 160;
        // 按钮高度，这是<button>默认的
        const payButtonHeight = 46;
        // 换算top
        var payButtonTop = (height - payButtonHeight) / 2.0;
        // 换算left
        var payButtonLeft = (getApp().screenWidth - payButtonWidth) / 2.0;
        that.setData({
            payButtonTop: payButtonTop,
            payButtonLeft: payButtonLeft
        });
    },
    payButtonTapped: function () {
        api.processOrder(that, function () {
            that.needPay();
        });
    },
    needPay: function () {
        wx.showModal({
            title: '暂不支持虚拟商品支付',
            content: '请移步服务号【灵动云课程】购买',
            showCancel: false
        });
    },
    onShareAppMessage: function () {
		// 微信分享
		return {
			title: '实战视频',
			desc: this.data.course.get('title'),
			path: '/video/detail/detail?objectId=' + this.data.objectId
		}
	},
})