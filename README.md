WebSocket是全双工通道，可以双向通信，功能更强；SSE是单向通道，只能服务器向浏览器端发送。
WebSocket是一个新的协议，需要服务器端支持；SSE则是部署在HTTP协议之上的，现有的服务器软件都支持。
SSE是一个轻量级协议，相对简单；WebSocket是一种较重的协议，相对复杂。
SSE默认支持断线重连，WebSocket则需要额外部署。
SSE支持自定义发送的数据类型。

建立一个SSE链接：var source = new EventSource(url)
链接状态 source.readyState ：
* 0，相当于常量EventSource.CONNECTING，表示连接还未建立，或者连接断线。
* 1，相当于常量EventSource.OPEN，表示连接已经建立，可以接受数据。
* 2，相当于常量EventSource.CLOSED，表示连接已断，且不会重连。

相关事件：
* open事件(连接一旦建立，就会触发open事件，可以定义相应的回调函数)
* message事件(收到数据就会触发message事件)
* error事件(如果发生通信错误（比如连接中断），就会触发error事件)

数据格式：
* Content-Type: text/event-stream //文本返回格式
* Cache-Control: no-cache  //不要缓存
* Connection: keep-alive //长链接标识


对于SSE来说，它的_优点就是轻_，而且对于服务端的支持度要更好。换言之，_可以使用SSE完成的功能需求，没有必要使用更重更复杂的websocket。_

比如：数据大屏的实时数据，消息中心的消息推送等一系列只需要服务端单方面推送而_不需要客户端同时进行反馈的需求_，SSE就是不二之选。

对于Websocket来说，_他的优点就是可以同时支持客户端和服务端的双向通讯_。所适用的业务场景：最典型的就是_聊天功能_。这种服务端需要主动向客户端推送信息，并且客户端也有向服务端推送消息的需求时，Websocket就是更好的选择。
