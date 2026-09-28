/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @author 黄秀杰
 */

var Bmob = require('../../utils/bmob.js');
const utils = require('../../utils/utils')
Bmob.initialize("4552ad36df85c1f29953ae3679c69248", "1d1136d0ff2c112fd3b86cb4368126f1");
var that;
var page;
var pageSize = 3;
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
				// 保存数据
				that.setData({
					newCourse: result.length ? that.data.newCourse.concat(utils.formatResults(result)) : that.data.newCourse,
					loadingTip: result.length < pageSize ? '已经没有更多啦' : '上拉加载更多'
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
		that.loadNewCourse(that.page.pageNo * pageSize);
	}
})