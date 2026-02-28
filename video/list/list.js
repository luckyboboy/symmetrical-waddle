/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @author 黄秀杰
 */

var Bmob = require('../../utils/bmob.js');

var that;
var page;
var pageSize = 10;
Page({
	data: {
		newCourse: []
	},
	onLoad: function (options) {
		// 页面加载
		that = this;
		that.page = {pageNo: 0, pageCount: 0};
		// 加载最新课堂
		that.loadNewCourse(0);
		// wx.navigateTo({
		// 	url: '../detail/detail?objectId=7LxpEEEQ'
		// });
	},
	loadNewCourse: function (offset) {
		// 读取最新课堂
		that.page.pageNo ++;
		var Course = Bmob.Object.extend("Course");
		var query = new Bmob.Query(Course);
	    query.limit(pageSize);
	    query.include('cover');
	    query.skip(offset);
	    query.ascending('priority');
	    // 排序按照创建日期
	    query.find({
	    	success: function(result) {
		        // 隐藏toast提示框
				wx.hideToast();
				// 保存数据
				that.setData({
					newCourse: that.data.newCourse.concat(result)
				});
			},
			error: function(object, error) {
			    // 查询失败
				console.log(error);
			
			}
	    });
	},
	showDetail: function (e) {
		// 跳转详情页
		var objectId = e.currentTarget.dataset.objectId;
		wx.navigateTo({
			url: "../detail/detail?objectId=" + objectId
		});
	},
	onShareAppMessage: function () {
		// 微信分享
		return {
			title: 'Mina组件库',
			desc: '实战视频',
			path: '/video/list/list'
		}
	},
	onReachBottom: function () {
		// 到达底部无限加载
		if (that.page.pageNo >= that.page.pageCount) {
			wx.showToast({
				title: '没有更多内容了',
				icon: 'success'
			});
			return;
		}
		that.loadNewCourse(that.page.pageNo * pageSize);
		wx.showToast({
			title: '正在加载',
			icon: 'loading',
			duration: 2000
		})
	}
})