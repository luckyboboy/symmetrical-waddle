Page({
	data: {
		cityArray: {
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
		targetLetter: '',
		currentCity: '瑞安'
	},
	onLoad() {
		this.generateLetters()
	},
	generateLetters() {
		this.setData({
			letters: Object.keys(this.data.cityArray)
		})
		console.log(this.data.letters)
	},
	scrollToView(e) {
		let letter = e.currentTarget.dataset.letter;
		this.setData({
			targetLetter: letter
		})
	}
})