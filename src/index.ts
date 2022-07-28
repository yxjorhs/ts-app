import * as config from './config';
import * as socketServer from './socket-server';
import * as redis from './redis';
import * as logger from './logger';

/**
 * 应用主函数
 */
async function main() {
  const c = config.init();
  logger.init();
  if (c.APP_REDIS_ENABLE) redis.init();
  if (c.APP_SOCKET_SERVER_ENABLE) await socketServer.listen();
}

main();
