Page({
  data: {
    todos: [{
      title: '明天9点打电话给老张',
      checked: false
    },{
      title: '打电话给老王',
      checked: false
    },{
      title: '打电话',
      checked: false
    }]
  },
  onLoad () {
    // mock
    const todos = []
    for (let index = 0; index < 12; index++) {
      todos.push({
        title: index
      })
    }
    // this.setData({
    //   todos: todos
    // })
  },
  add (e) {
    // 获取文本框里的内容
    const title = e.detail.value
    if (!title) {
      wx.showToast({
        title: '请输入内容'
      })
      return
    }
    let todos = this.data.todos
    let todo = {
      title: title,
      checked: false
    }
    todos.push(todo)
    this.setData({
      todos: todos
    })
  },
  editing (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    // 进入focus
  },
  edit (e) {
    // 获取input组件上的取值
    const title = e.detail.value
    const index = e.currentTarget.dataset.index
    let todos = this.data.todos
    todos[index].title = title
    this.setData({
      todos: todos,
      currentIndex: -1
    })
  },
  checkboxChange(e) {
    const values = e.detail.value
    this.setData({
      checkIndices: values
    })
  },
  // 批量删除
  deleteAll () {
    const checkIndices = this.data.checkIndices
    if (Array.isArray(checkIndices) && checkIndices.length > 0) {
      wx.showModal({
        title: '确定删除吗？',
        success: ({confirm}) => {
          if (confirm) {
            // 从后往前遍历
            let todos = this.data.todos
            // debugger
            for (let i = checkIndices.length - 1; i >= 0; i--) {
            }
            checkIndices.sort((a, b) => {
              return a - b
            }).reverse()
            checkIndices.forEach(item => {
              todos.splice(item, 1)
              
            })
            // debugger
            this.setData({
              todos: todos
            })
            wx.showToast({
              title: '删除成功'
            })
          }
        }
      })
    }
  },
  // 失去焦点
  bindblur (e) {
    this.setData({
      currentIndex: -1
    })
  }
})