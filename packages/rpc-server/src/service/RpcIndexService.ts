import {
    type IContainer,
    withContainer
} from "@use-pico/container";
import {
    type IRpcHandlerClass,
    type IRpcIndexService
} from "@use-pico/rpc";

export class RpcIndexService implements IRpcIndexService {
    static inject = [
        withContainer.inject,
    ];

    constructor(
        protected container: IContainer.Type,
    ) {
    }

    public register<T extends IRpcHandlerClass<any, any, any>>(handler: T): void {
        this.container.useClass(handler.$key, handler);
    }

    public using<T extends IRpcHandlerClass<any, any, any>>(handlers: T[]): void {
        handlers.forEach(handler => this.register(handler));
    }
}
