var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
				tabBar: {
					"selectedColor": "#5DBCFF",
					"normalColor": "#333",
					"list": [{
						"pagePath": "market/index/index",
						"iconPath": "images/icon_home.png",
						"selectedIconPath": "images/icon_home_selected.png",
						"text": "首页"
					}, {
						"pagePath": "tools/index/index",
						"iconPath": "images/icon_cate.png",
						"selectedIconPath": "images/icon_cate_selected.png",
						"text": "分类"
					}, {
						"pagePath": "viewing/index/index",
						"iconPath": "images/icon_member.png",
						"selectedIconPath": "images/icon_member_selected.png",
						"text": "我"
					}]
				},
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    sliderLeft: (res.windowWidth / this.data.tabBar.list.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / this.data.tabBar.list.length * this.data.activeIndex
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