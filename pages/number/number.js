Page({
  data: {
    number: 1
  },
  onLoad() {
    const duration = 1000 // 动画持续时间，即约定的时间内播放完毕
    let max = 1250000 // 需要读到目标值
    const hack = 0.95 // 防止整数时的个位数一直不变
    const interval = 10 // 目标数值越大，步长越长，才能在特定的时间播放完
    const offset = Math.round(max / (duration / interval) * hack)
    let number = this.data.number
    let timer = setInterval(() => {
      console.log('interval')
      if (number < max) {
        number = number + offset // 每次都迭加一定的步长
        this.setData({
          number: number
        })
      } else {
        // 加过头了，就设定目标值就好
        this.setData({
          number: max
        })
        // 清除定时器
        clearInterval(timer)
      }
    }, interval)
  }
})