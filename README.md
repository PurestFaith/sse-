# SSE Demo

这是一个使用 Server-Sent Events (SSE) 实现服务器实时推送数据的示例项目。

## 功能特点

- 服务器端使用 Express.js 实现 SSE 接口
- 前端实现实时数据接收和展示
- 支持自动重连
- 优雅的错误处理
- 美观的用户界面

## 安装

```bash
# 克隆项目
git clone https://github.com/PurestFaith/sse-.git
cd sse-

# 安装依赖
npm install
```

## 使用方法

1. 启动开发服务器：

```bash
npm run dev
```

2. 在生产环境中运行：

```bash
npm start
```

3. 打开浏览器访问 http://localhost:8088 查看演示效果

## 项目结构

```
sse-demo/
├── public/           # 前端静态文件
│   └── index.html    # 前端页面
├── server/           # 后端代码
│   └── index.js      # 服务器入口文件
├── .gitignore       # Git 忽略文件
├── package.json     # 项目配置文件
└── README.md        # 项目说明文档
```

## 技术栈

- Node.js
- Express.js
- Server-Sent Events (SSE)
- HTML5
- CSS3
- JavaScript

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

[MIT](LICENSE)