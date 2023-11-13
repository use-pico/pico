import {withService}        from "@use-pico/container";
import {type IRedisService} from "../api/IRedisService";

export const withRedisService = withService<IRedisService>("@use-pico/redis/RedisService");
export type withRedisService = typeof withRedisService;
