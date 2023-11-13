import {isString}           from "@use-pico/utils";
import {type IRedisService} from "../api/IRedisService";
import {type Redis}         from "../api/Redis";
import {withRedis}          from "../container/withRedis";

export class RedisService implements IRedisService {
    static inject = [
        withRedis.inject,
    ];

    constructor(
        public readonly redis: Redis,
    ) {
    }

    public async cache<TValue>(key: string | any[], value: () => Promise<TValue>, bypass: boolean = false): Promise<TValue> {
        if (bypass) {
            return value();
        }
        const $key = isString(key) ? key : JSON.stringify(key);
        const cached = await this.redis.get($key);
        if (cached) {
            return JSON.parse(cached) as TValue;
        }
        const $value = await value();
        this.redis.set($key, JSON.stringify($value));
        return $value;
    }

    public async clear(): Promise<void> {
        await this.redis.flushall();
    }
}
