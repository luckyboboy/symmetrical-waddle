Page({
  data: {
    items: [
      {
        title: '无限加载',
        url: './task/list/list',
      },
      {
        title: '使用插件',
        url: './plugin/index/index',
      },
      {
        title: 'TODO清单',
        url: './todo/index',
      },
      {
        title: 'TODO微信云开发',
        url: './todo-cloud/index',
      },
      {
        title: 'TODO知晓云开发',
        url: './todo-zx/index',
      },
      {
        title: 'VantUI购物车',
        url: './todo/index',
      },
      {
        title: 'PS抠图',
        url: './ps/index',
      },
      {
        title: 'PS抠图',
        url: './ps-cloud/index',
      },
      {
        title: '外汇牌价',
        url: './exchange/list/list',
      },
      {
        title: '银行卡识别',
        url: './ocr/index/index',
      },
      {
        title: 'npm模块',
        url: './npm/index',
      },
      {
        title: '分段组件',
        url: './radiogroup/index',
      },
      {
        title: '动态数字',
        url: './number/number',
      },
      {
        title: '弹窗',
        url: './alert/index',
      },
      {
        title: '城市切换',
        url: './city/index/index',
      },
      {
        title: '聊天界面',
        url: './chat/index',
      },
      {
        title: '手工写的购物车',
        url: './cart/index',
      },
      {
        title: '底部Tab',
        url: './tab/index',
      },
      {
        title: '时间轴',
        url: './timeline/index',
      },
      {
        title: '万年历',
        url: './calendar/index/index',
      },
      {
        title: '回到顶部',
        url: './scrolltop/index/index',
      },
      {
        title: '页面穿梭',
        url: './transfer/list/list',
      }
    ]
  },
  onShareAppMessage: function () {
		return {
			title: 'Mina组件库',
			desc: '汇集高频使用的组件',
			path: '/pages/index'
		}
  }
})