Page({
  data: {},
  onLoad() {
    this.loadData()
  },
  loadData() {
    let Todo = new wx.BaaS.TableObject('Todo')
    const query = new wx.BaaS.Query()

    Todo.setQuery(query)
      .find()
      .then(res => {
        // find 方法返回值为一个 Promise
        console.log(res)
        const todos = res.data.objects
        this.setData({
          todos: todos
        })
      })
  },
  // 模拟长列表数据源
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
    let tableName = 'Todo'
    // 通过 `tableName` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表
    let Todo = new wx.BaaS.TableObject(tableName)
    // 本地创建一条空记录
    let todo = Todo.create() // todo 为 TableRecord 实例

    let item = {
      title: title
    }

    // 为上面创建的空记录赋值，并保存到服务器，save() 方法返回一个 Promise 对象
    todo
      .set(item)
      .save()
      .then(res => {
        console.log(res)
        wx.showToast({
          title: '保存成功'
        })
      })
    // 获取原来数据源
    this.loadData()
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
    // 设定currentIndex值
    const index = e.currentTarget.dataset.index
    // 获取原来数据源
    let todos = this.data.todos
    // 修改当前元素的title值
    const recordID = todos[index]._id
    // 更新 tableName 为 'Todo' 的数据表中 id 为 currentId 的数据行的 title 字段
    let tableName = 'Todo'

    let Todo = new wx.BaaS.TableObject(tableName)
    let todo = Todo.getWithoutData(recordID)

    todo.set('title', title)
    todo.update().then(
      res => {
        // success
        wx.showToast({
          title: '修改成功'
        })
        this.loadData()
        this.setData({
          currentIndex: -1
        })
      },
      err => {
        console.log(err)
        // err
      }
    )
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
              // 删除 tableName 为 'Todo' 的数据表中 recordID 的数据项
              let tableName = 'Todo'
              let recordID = this.data.todos[item]._id

              let Todo = new wx.BaaS.TableObject(tableName)
              Todo.delete(recordID).then(
                res => {
                  // success
                  this.loadData()
                  wx.showToast({
                    title: '删除成功'
                  })
                  // checkIndices将它复位
                  this.setData({
                    checkIndices: []
                  })
                },
                err => {
                  // err
                }
              )
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
