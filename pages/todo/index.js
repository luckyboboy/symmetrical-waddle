Page({
  data: {
    todos: [{
      title: '明天9点打电话给老张',
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
  }
})