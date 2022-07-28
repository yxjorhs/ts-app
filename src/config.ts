import fs from 'fs';
import lodash from 'lodash';

const defaultConf = {
  /** 是否开启socket服务 */
  APP_SOCKET_SERVER_ENABLE: false,
  /** 日志等级, 具体查看pino.Level */
  LOGGER_LEVEL: 'debug',
  /** 日志输出位置 */
  LOGGER_OUT: 'stdout' as 'stdout' | 'file',
  /** 日志文件路径 */
  LOGGER_OUT_FILE_PATH: '',
  /** Redis的db */
  REDIS_DB: 0,
  /** Redis的key前缀 */
  REDIS_KEY_PREFIX: undefined as undefined | string,
  /** redis模式，单节点或集群 */
  REDIS_MODE: 'normal' as 'normal' | 'cluster',
  /** redis节点,集群模式多个时使用','隔开, 例: 127.0.0.1:6379,127.0.0.2:6379 */
  REDIS_NODES: '127.0.0.1:6379',
  /** socket server 端口 */
  SOCKET_SERVER_PORT: 0,
  /** socket server 关闭丢失客户端的间隔(毫秒) */
  SOCKET_SERVER_CLOSE_LOSE_CLIENT_INTERVAL_MS: 10000,
};

let conf: typeof defaultConf;

function init() {
  const jsonPath = __dirname + '/../conf/app.json';
  const jsonConf = JSON.parse(fs.readFileSync(jsonPath).toString());
  conf = lodash.merge(defaultConf, jsonConf);
}

/**
 * 返回应用配置
 * @return 配置
 */
export function get() {
  if (conf === undefined) init();
  return conf;
}

