var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    sliderLeft: (res.windowWidth / this.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});