// 引入城市数据源
const cities = require('../utils/city.js')
// 引入通知组件
const WxNotificationCenter = require('../utils/WxNotificationCenter')
// 引入工具类
const utils = require('../utils/utils')

Page({
	data: {
		allCities: [], // 所有城市字典
		recommendCities: [], // 热门城市字典
		targetLetter: '', // 滚动视图所要指定的id
		currentCity: '', // 当前城市
		geoCity: '', // 定位城市
		scrollHeight: wx.getSystemInfoSync().windowHeight // 滚动视图高度
	},
	onLoad(options) {
		// 读取并格式化城市数据
		this.generateCities()
		// 生成热门城市
		this.generateRecommendCities()
		// 生成字母数组
		this.generateLetters()
		// 获取定位城市名
		this.getLocation()
		// 传值当前城市
		this.setData({
			currentCity: options.currentCity || '请选择'
		})
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
		// 从Object对象取出key得到字母数组
		this.setData({
			letters: Object.keys(this.data.allCities)
		})
	},
	letterTapped(e) {
		// 滚动scroll-view到相应id处
		let letter = e.currentTarget.dataset.letter
		this.setData({
			targetLetter: letter
		})
	},
	selectCity(e) {
		// 点击城市事件，滚动scroll-view到顶部以及设定当前城市名
		let cityName = e.currentTarget.dataset.cityName
		WxNotificationCenter.postNotificationName("citySelectedNotification", cityName)
		wx.navigateBack()
	},
	getLocation() {
		utils.getLocation(cityName => {
			this.setData({
				geoCity: cityName
			})
		})
	}
})