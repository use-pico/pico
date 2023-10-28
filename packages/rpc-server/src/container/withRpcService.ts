import {withService}      from "@use-pico/container";
import {type IRpcService} from "@use-pico/rpc";

export const withRpcService = withService<IRpcService>("@use-pico/rpc/RpcService");
