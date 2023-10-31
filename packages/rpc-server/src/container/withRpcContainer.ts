import {type IContainer}     from "@use-pico/container";
import {RpcIndexService}     from "../service/RpcIndexService";
import {RpcService}          from "../service/RpcService";
import {withRpcIndexService} from "./withRpcIndexService";
import {withRpcService}      from "./withRpcService";

export const withRpcContainer: IContainer.Register = container => {
    withRpcService.bind(container, RpcService);
    withRpcIndexService.bind(container, RpcIndexService);
};
