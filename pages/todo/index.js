Page({
  data: {
    todos: [{
      title: '明天9点打电话给老张',
      checked: false
    },{
      title: '打电话给老王',
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
  }
})