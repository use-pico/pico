import {proxyOf}           from "@use-pico/utils";
import {type FactoryValue} from "pumpit";
import "server-only";
import {type IContainer}   from "../api/IContainer";

export namespace withService {
    export interface Service<TService> {
        service: TService;

        inject: symbol;

        use(container: IContainer.Type): TService;

        bind<T extends new (...args: any) => TService>(container: IContainer.Type, value: T, options?: IContainer.Options.Class<T>): void;

        factory<T extends FactoryValue>(container: IContainer.Type, factory: T, options?: IContainer.Options.Factory<T>): void;

        value(container: IContainer.Type, value: TService): void;
    }
}

export const withService = <TService>(key: string): withService.Service<TService> => {
    return {
        service: proxyOf,
        inject:  Symbol.for(key),
        use(container) {
            return container.resolve<TService>(this.inject);
        },
        bind(container, value, options) {
            container.useClass(this.inject, value, options);
        },
        factory(container, factory, options) {
            container.useFactory(this.inject, factory, options);
        },
        value(container, value) {
            container.useValue(this.inject, value);
        },
    };
};
