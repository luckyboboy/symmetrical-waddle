Page({
	data: {
		visual: false,
		animate: '',
		fade: '',
	},
	onLoad: function () {
    setTimeout(() => {
      this.show();
    }, 1000)
	},
	hide: function () {
		// 隐藏modal弹窗
		this.setData({
			animate: 'bounceOut',
			fade: 'fadeOut',
			isEditing: false,
		});
		// 动画结束后应该隐藏之，防止隔空被点击
		setTimeout(()=> {
			this.setData({
				visual: false,
			});
		}, 750);
	},
	show: function () {
		// 显示modal弹窗
		this.setData({
			visual: true,
			animate: 'bounceIn',
			fade: 'fadeIn',
		});
	},
	preventDefault: function () {
		// 什么都不做，只为阻止父元素点击hide事件
	},
})