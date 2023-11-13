import {type Redis} from "./Redis";

export interface IRedisService {
    readonly redis: Redis;

    /**
     * Cache given value under given key. If value is not cached, it's generated.
     *
     * Use bypass to disable cache read/write.
     */
    cache<TValue>(key: string | any[], value: () => Promise<TValue>, bypass?: boolean): Promise<TValue>;

    /**
     * Clear all cached values.
     */
    clear(): Promise<void>;
}
