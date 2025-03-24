require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8088;

// 存储所有活动的 SSE 连接
const clients = new Set();

// 中间件
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// SSE 路由
app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const client = {
    id: Date.now(),
    res
  };
  
  clients.add(client);
  console.log(`Client connected: ${client.id}`);

  // 客户端断开连接时的处理
  req.on('close', () => {
    clients.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  });

  // 发送初始连接成功消息
  res.write(`data: ${JSON.stringify({ message: 'Connected successfully' })}\n\n`);

  // 定时发送数据
  const interval = setInterval(() => {
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`,
      clientId: client.id
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  // 连接关闭时清理定时器
  req.on('close', () => clearInterval(interval));
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', connections: clients.size });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  clients.forEach(client => client.res.end());
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});