import {withService}           from "@use-pico/container";
import {type IRpcIndexService} from "../api/IRpcIndexService";

export const withRpcIndexService = withService<IRpcIndexService>("@use-pico/rpc/RpcIndexService");
