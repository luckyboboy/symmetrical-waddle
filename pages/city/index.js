// 引入城市数据源
const cities = require('./utils/city.js')
// 引入腾讯地图组件
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');

Page({
	data: {
		allCities: [], // 所有城市字典
		recommendCities: [], // 热门城市字典
		targetLetter: '', // 滚动视图所要指定的id
		currentCity: '瑞安', // 当前城市
		geoCity: '', // 定位城市
		scrollTop: 0, // 滚动条位置，用于控制回到顶部
		scrollHeight: wx.getSystemInfoSync().windowHeight // 滚动视图高度
	},
	onLoad() {
		// 读取并格式化城市数据
		this.generateCities()
		// 生成热门城市
		this.generateRecommendCities()
		// 生成字母数组
		this.generateLetters()
		// 获取定位城市名
		this.getLocation()
	},
	generateCities() {
		// 全部城市
		let citiesGroup = {}
		cities.forEach(item => {
			// 取出pinyin字段的第一个字母
			let letter = item.pinyin.substr(0, 1)
			// 当前字母组未包含任何一个元素，则初始化为[]空数组
			citiesGroup[letter] = citiesGroup[letter] || []
			// 每个元素塞进相应的字母组中
			citiesGroup[letter].push(item)
		})
		// 按字母表排序得出最终适用的全部城市字典
		let allCities = {}
		Object.keys(citiesGroup).sort().forEach(letter => {
			allCities[letter] = citiesGroup[letter]
		})
		this.setData({
			allCities: allCities
		})
	},
	generateRecommendCities() {
		// 筛选出热门城市
		let recommendCities = cities.filter(item => {
			let target = ['北京', '上海', '广州', '深圳', '天津', '成都', '重庆', '佛山', '青岛', '东莞', '贵阳']
			if (target.indexOf(item.name) >= 0) {
				return true
			}
		})
		this.setData({
			recommendCities: recommendCities
		})
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
			currentCity: cityName,
			scrollTop: 0
		})
	},
	getLocation() {
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
				})
			}
		})
	}
})