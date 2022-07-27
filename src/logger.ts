import pino from 'pino';
import fs from 'fs';
import * as config from './config';

const {
  LOGGER_LEVEL,
  LOGGER_OUT,
  LOGGER_OUT_FILE_PATH
} = config.get()

const outputStream = LOGGER_OUT === 'stdout'
  ? process.stdout
  : fs.createWriteStream(LOGGER_OUT_FILE_PATH)

const logger = pino({
  level: LOGGER_LEVEL,
}, outputStream)

export function print(level: pino.Level, msg: string | object) {
  const data = typeof msg === 'string' ? { msg } : msg
  logger[level](data)
}

