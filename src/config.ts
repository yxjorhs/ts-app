import fs from 'fs';
import lodash from 'lodash';

const defaultConf = {
  /** 是否开启socket服务 */
  APP_SOCKET_SERVER_ENABLE: false,
  /** socket server 端口 */
  SOCKET_SERVER_PORT: 0,
  /** socket server 关闭丢失客户端的间隔(毫秒) */
  SOCKET_SERVER_CLOSE_LOSE_CLIENT_INTERVAL_MS: 10000,
};

const jsonPath = __dirname + '/../conf/app.json';
const jsonConf = JSON.parse(fs.readFileSync(jsonPath).toString());
const conf: typeof defaultConf = lodash.merge(defaultConf, jsonConf);

/**
 * 返回应用配置
 * @return 配置
 */
export function get() {
  return conf;
}

