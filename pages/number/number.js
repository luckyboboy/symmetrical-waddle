Page({
  data: {
    max: 125,
    number: 1
  },
  onLoad() {
    const interval = 10
    let number = this.data.number
    let timer = setInterval(() => {
      console.log('interval')
      if (number < this.data.max) {
        // console.log('can do it')
        number++
        this.setData({
          number: number
        })
      } else {
        clearInterval(timer)
      }
    }, interval)
  }
})