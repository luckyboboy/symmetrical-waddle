Page({
  data: {
    carts: require('./static/data'),
    checked: false
  },
  checkboxGroupChange(event) {
    this.setData({
      result: event.detail
    })
  },
  toggleAllChange(event) {
    this.setData({
      checked: event.detail
    })
  }
})
