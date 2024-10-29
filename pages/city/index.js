let {
	allCities,
	recommendCities
} = require('./utils/city')
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');

Page({
	data: {
		allCities: allCities, // 所有城市字典
		recommendCities: recommendCities, // 热门城市字典
		targetLetter: '', // 滚动视图所要指定的id
		currentCity: '瑞安', // 当前城市
		geoCity: '' // 定位城市
	},
	onLoad() {
		// 生成字母数组
		this.generateLetters()
		// 初始化腾讯地图
		let qqmapsdk = new QQMapWX({
			key: 'BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U'
		})
		// 调用接口
		qqmapsdk.reverseGeocoder({
			poi_options: 'policy=2',
			get_poi: 1,
			success: (res) => {
				// 渲染给页面
				this.setData({
					geoCity: res.result.address_component.district
				});    
			}
		});
	},
	generateLetters() {
		// 从Object对象取出
		this.setData({
			letters: Object.keys(this.data.allCities)
		})
	},
	scrollToView(e) {
		// 滚动视频到相应id处
		let letter = e.currentTarget.dataset.letter
		this.setData({
			targetLetter: letter
		})
	},
	selectCity(e) {
		// 点击城市事件
		let cityName = e.currentTarget.dataset.cityName
		this.setData({
			currentCity: cityName
		})
	}
})