import * as config from './config';
import * as socketServer from './socket-server';

/**
 * 应用主函数
 */
async function main() {
  const c = config.get();
  if (c.APP_SOCKET_SERVER_ENABLE) await socketServer.listen();
}

main();
