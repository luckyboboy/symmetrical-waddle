Page({
  data: {
    todos: []
  },
  onLoad() {
    // 调用模拟数据代码，需要时打开下面的注释
    // this.mock()
    this.onQuery()
  },
  add(e) {
    // 获取文本框里的内容
    const title = e.detail.value
    // 如果文本为空，给出toast提示
    if (!title) {
      wx.showToast({
        title: '请输入内容'
      })
      return
    }
    // 获取原来数据源
    let todos = this.data.todos
    // 构建todo对象
    let todo = {
      title: title
    }
    // 向数组最后添加一个元素
    this.onAdd(todo)
    // 保存数据源
    this.setData({
      title: ''
    })
  },
  // 添加数据
  onAdd(todo) {
    const db = wx.cloud.database()
    db.collection('todos').add({
      data: todo,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功'
        })
        this.onQuery()
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  // 修改
  onUpdate(todo) {
    const db = wx.cloud.database()
    db.collection('todos')
      .doc(todo._id)
      .update({
        data: {
          title: todo.title
        },
        success: res => {
          this.onQuery()
        },
        fail: err => {
          icon: 'none', console.error('[数据库] [更新记录] 失败：', err)
        }
      })
  },
  // 删除
  onRemove(todo) {
    const db = wx.cloud.database()
    db.collection('todos')
      .doc(todo._id)
      .remove({
        success: res => {
          wx.showToast({
            title: '删除成功'
          })
          this.onQuery()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败'
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
  },
  // 查询
  onQuery() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('todos').get({
      success: res => {
        this.setData({
          todos: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  editing(e) {
    // 获取当时点击的是第n个元素
    const index = e.currentTarget.dataset.index
    // 设定currentIndex值，让当前的文本框高亮
    this.setData({
      currentIndex: index
    })
  },
  edit(e) {
    // 获取input组件上的取值
    const title = e.detail.value
    // 设定currentIndex值，改变它的聚会
    const index = e.currentTarget.dataset.index
    // 获取原来数据源
    const todos = this.data.todos
    // 修改当前元素的title值
    const todo = todos[index]
    todo.title = title
    this.onUpdate(todo)
    // 保存数据源
    this.setData({
      currentIndex: -1
    })
  },
  // 勾选事件
  checkboxChange(e) {
    // 取出当前复选框的值
    const values = e.detail.value
    // 保存数据源
    this.setData({
      checkIndices: values
    })
  },
  // 批量删除
  deleteAll() {
    const checkIndices = this.data.checkIndices
    // 判断是不是数组，并且元素个数大于1
    if (Array.isArray(checkIndices) && checkIndices.length > 0) {
      // 删除确认
      wx.showModal({
        title: '确定删除吗？',
        success: ({ confirm }) => {
          if (confirm) {
            // 从后往前遍历，不会造成index错乱
            let todos = this.data.todos
            for (let i = checkIndices.length - 1; i >= 0; i--) {}
            // 注意sort原生是按string的ascii排序，会造成1,11，2这样一系列数据排序不合预期
            checkIndices
              .sort((a, b) => {
                return a - b
              })
              .reverse()
            // 逆序后就可以逐一删除元素
            checkIndices.forEach(item => {
              this.onRemove(this.data.todos[item])
            })
            // 保存数据源，同时checkIndices将它复位
            this.setData({
              checkIndices: []
            })
            // 给出提示框
            wx.showToast({
              title: '删除成功'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先勾选'
      })
    }
  },
  // 失去焦点事件
  bindblur(e) {
    // 列表中的文本框失去焦点时，currentIndex复位，让它们全部回到未高亮的状态
    this.setData({
      currentIndex: -1
    })
  }
})
