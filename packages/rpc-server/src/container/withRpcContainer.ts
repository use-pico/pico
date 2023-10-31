import {type IContainer} from "@use-pico/container";
import {RpcService}      from "../service/RpcService";
import {withRpcService}  from "./withRpcService";

export const withRpcContainer: IContainer.Register = container => {
    withRpcService.bind(container, RpcService);
};
