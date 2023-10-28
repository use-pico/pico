import {withAuthContainer} from "@use-pico/auth";
import {
    Container,
    type IContainer,
    withContainer
}                          from "@use-pico/container";
import {withRpcContainer}  from "@use-pico/rpc";

export const withServerContainer = (instance?: IContainer.Instance) => {
    const container = new Container(instance);
    withContainer.value(container, container);

    const register = [
        withAuthContainer,
        withRpcContainer,
    ] as const;

    register.forEach(register => register(container));

    return container;
};
