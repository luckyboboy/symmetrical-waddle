Page({
  data: {
    arr: [1, 2, 9]
  },
  onLoad() {
    const _ = require('underscore')
    const min = _.min(this.data.arr)
    console.log(min)
    this.setData({
      min: min
    })
  }
})