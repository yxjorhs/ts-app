import assert from 'assert';
import * as redis from '../src/redis';

describe('redis', () => {
  it('default', async () => {
    const rds = redis.get()
    const key = 'a'
    const value = 'hello world'
    await rds.set(key, value)
    assert(await rds.get(key) === value)
  })
})

