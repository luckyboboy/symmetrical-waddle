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

  },
  add (e) {
    const title = e.detail.value
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
  delete (e) {
    const index = e.currentTarget.dataset.index
    let todos = this.data.todos
    todos.splice(index, 1)
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
    // 从后往前遍历
    const checkIndices = this.data.checkIndices
    let todos = this.data.todos
    // debugger
    for (let i = checkIndices.length - 1; i >= 0; i--) {
      todos.splice(checkIndices[i], 1)
    }
    // debugger
    this.setData({
      todos: todos
    })
  }
})