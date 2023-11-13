import {type IContainer}  from "@use-pico/container";
import {RedisService}     from "../service/RedisService";
import {withRedisService} from "./withRedisService";

export const withRedisContainer: IContainer.Register = container => {
    withRedisService.bind(container, RedisService);
};
