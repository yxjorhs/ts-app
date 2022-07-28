import IORedis from 'ioredis';
import * as config from './config';

let redis: IORedis.Redis | IORedis.Cluster;

export function init() {
  const c = config.get();

  const redisOptions: IORedis.RedisOptions = {
    keyPrefix: c.REDIS_KEY_PREFIX,
    db: c.REDIS_DB,
  };

  redis = c.REDIS_MODE === 'normal' ?
    new IORedis(c.REDIS_NODES, redisOptions) :
    new IORedis.Cluster(c.REDIS_NODES.split(','), { redisOptions });
}

export function get() {
  return redis;
}

