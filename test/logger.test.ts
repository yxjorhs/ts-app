import * as config from '../src/config';
import * as logger from '../src/logger';

describe('logger', () => {
  config.init()
  logger.init()

  it('default', () => {
    logger.print('info', { msg: 'hello world' })
  })
})

