import assert from 'assert';
import * as config from '../src/config';
import * as redis from '../src/redis';

describe('redis', () => {
  config.init()
  redis.init()
  const rds = redis.get()

  it('default', async () => {
    const key = 'a'
    const value = 'hello world'
    await rds.set(key, value)
    assert(await rds.get(key) === value)
  })
})

