import {withAuthContainer}        from "@use-pico/auth-server";
import {
    Container,
    type IContainer,
    withContainer
}                                 from "@use-pico/container";
import {withTranslationContainer} from "@use-pico/i18n-server";
import {withRedisContainer}       from "@use-pico/redis";
import {withRpcContainer}         from "@use-pico/rpc-server";

export const withServerContainer = (instance?: IContainer.Instance) => {
    const container = new Container(instance);
    withContainer.value(container, container);

    const register = [
        withAuthContainer,
        withRedisContainer,
        withRpcContainer,
        withTranslationContainer,
    ] as const;

    register.forEach(register => register(container));

    return container;
};
