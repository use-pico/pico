import {withService} from "@use-pico/container";
import {type Redis}  from "../api/Redis";

export const withRedis = withService<Redis>("@use-pico/redis/Redis");
export type withRedis = typeof withRedis;
