Page({
  data: {
    number: 1
  },
  onLoad() {
    const duration = 1000 // 动画持续时间，即约定的时间内播放完毕
    let max = 1250000
    // 数值越大，步长越长，才能在特定的时间播放完
    const interval = 10
    const offset = Math.round(max / (duration / interval) * .99)
    let number = this.data.number
    let timer = setInterval(() => {
      console.log('interval')
      if (number < max) {
        number = number + offset
        this.setData({
          number: number
        })
      } else {
        this.setData({
          number: max
        })
        clearInterval(timer)
      }
    }, interval)
  }
})