const express = require('express') //引用框架
const cors = require('cors') //引用跨域模块
const app = express() //创建服务
const port = 8088 //项目启动端口

app.use(cors()) //使用跨域模块

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream', //设定数据类型
    'Cache-Control': 'no-cache', // 长链接拒绝缓存
    Connection: 'keep-alive', //设置长链接
  })

  console.log('进入到长连接了')
  //持续返回数据
  setInterval(() => {
    console.log('正在持续返回数据中ing')
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`,
    }
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }, 1000)
})

//创建项目
app.listen(port, () => {
  console.log(`项目启动成功-http://localhost:${port}`)
})
