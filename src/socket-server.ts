import * as config from './config';
import { WebSocketServer, WebSocket } from 'ws';
import * as socketRouter from './socket-router';

export async function listen() {
  const c = config.get();
  const wss = new WebSocketServer({ port: c.SOCKET_SERVER_PORT });

  wss.on('connection', function(ws) {
    ws.on('message', (raw) => socketRouter.handleMsg(raw, wss, ws));
    ws.on('pong', () => loseClients.delete(ws));
  });

  listenLoseClientAndClose(wss);
}

const loseClients: WeakSet<WebSocket> = new WeakSet();

function closeLoseClient(wss: WebSocketServer) {
  wss.clients.forEach((cli) => {
    if (loseClients.has(cli)) {
      cli.terminate();
      loseClients.delete(cli);
      return;
    }

    // 将客户端设为丢失，并发出ping，在收到客户端的pong时取消其丢失状态
    // 假设客户端没响应则会在下次关闭客户端
    loseClients.add(cli);
    cli.ping();
  });
}

function listenLoseClientAndClose(wss: WebSocketServer) {
  const interval = config.get().SOCKET_SERVER_CLOSE_LOSE_CLIENT_INTERVAL_MS;

  closeLoseClient(wss);

  setTimeout(() => listenLoseClientAndClose(wss), interval);
}

