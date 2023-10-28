import {withService}           from "@use-pico/container";
import {type IRpcIndexService} from "@use-pico/rpc";

export const withRpcIndexService = withService<IRpcIndexService>("@use-pico/rpc/RpcIndexService");
