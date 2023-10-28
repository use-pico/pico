import {type IRpcHandlerClass} from "./IRpcHandlerClass";

export interface IRpcIndexService {
    register<T extends IRpcHandlerClass<any, any, any>>(handler: T): void;

    using<T extends IRpcHandlerClass<any, any, any>>(handlers: T[]): void;
}
