//index.js
Page({
  data: {
    items: [
      {value: 'USA', title: '美国'},
      {value: 'CHN', title: '中国', checked: 'true'},
      {value: 'BRA', title: '巴西'},
      {value: 'ENG', title: '英国'},
    ],
    country: ''
  },
  radioChange: function(e) {
    this.setData({
      country: e.detail.value
    });
  }
})