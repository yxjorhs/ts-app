import * as logger from '../src/logger';

describe('logger', () => {
  it('default', () => {
    logger.print('info', { msg: 'hello world' })
  })
})

