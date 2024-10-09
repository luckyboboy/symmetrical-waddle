let {allCities, recommendCities} = require('./utils/city')

Page({
	data: {
		allCities: allCities,
		recommendCities: recommendCities,
		targetLetter: '',
		currentCity: '瑞安'
	},
	onLoad() {
		this.generateLetters()
	},
	generateLetters() {
		this.setData({
			letters: Object.keys(this.data.allCities)
		})
	},
	scrollToView(e) {
		let letter = e.currentTarget.dataset.letter
		this.setData({
			targetLetter: letter
		})
	},
	selectCity(e) {
		let cityName = e.currentTarget.dataset.cityName
		this.setData({
			currentCity: cityName
		})
	}
})