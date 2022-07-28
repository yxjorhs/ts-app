import pino from 'pino';
import fs from 'fs';
import * as config from './config';

let logger: pino.Logger;

function init() {
  const c = config.get();
  const outputStream = c.LOGGER_OUT === 'stdout' ?
    process.stdout :
    fs.createWriteStream(c.LOGGER_OUT_FILE_PATH);

  logger = pino({
    level: c.LOGGER_LEVEL,
  }, outputStream);
}

export function print(level: pino.Level, msg: string | object) {
  if (logger === undefined) init();

  const data = typeof msg === 'string' ? { msg } : msg;
  logger[level](data);
}

