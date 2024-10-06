Page({
	data: {
		allCities: {
			"A": [{
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				}, {
					name: '安阳',
					shortname: 'anyang'
				},
				{
					name: '鞍山',
					shortname: 'anshan'
				},
				{
					name: '阿勒泰',
					shortname: 'aletai'
				},
			],
			"B": [{
				name: '北京',
				shortname: 'beijing'
			}],
			"C": [],
			"D": [],
			"E": [],
			"F": [],
			"G": [],
			"H": [],
			"I": [],
			"J": [],
			"K": [],
			"L": [],
			"M": [],
			"N": [],
			"O": [],
			"P": [],
			"Q": [],
			"R": [],
			"T": [],
		},
		recommendCities: [
			{
				name: '北京',
				shortname: 'beijing'
			},
			{
				name: '上海',
				shortname: 'shanghai'
			},
			{
				name: '广州',
				shortname: 'guangzhou'
			},
			{
				name: '深圳',
				shortname: 'shenzhen'
			},
			{
				name: '天津',
				shortname: 'beijing'
			},
			{
				name: '成都',
				shortname: 'chengdu'
			},
			{
				name: '重庆',
				shortname: 'chongqing'
			},
			{
				name: '佛山',
				shortname: 'foshan'
			},
			{
				name: '青岛',
				shortname: 'qingdao'
			},
			{
				name: '东莞',
				shortname: 'dongguan'
			},
			{
				name: '贵阳',
				shortname: 'guiyang'
			}
		],
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