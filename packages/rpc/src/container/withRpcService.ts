import {withService}      from "@use-pico/container";
import {type IRpcService} from "../api/IRpcService";

export const withRpcService = withService<IRpcService>("@use-pico/rpc/RpcService");
