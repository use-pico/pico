import {
    type AvailableScopes,
    type BindKey,
    type ClassOptions,
    type ClassValue,
    type FactoryOptions,
    type FactoryValue,
    PumpIt,
    SCOPE
}                       from "pumpit";
import {type Container} from "../container/Container";

export namespace IContainer {
    export type Register = (container: Type) => void;

    export type Type = InstanceType<typeof Container>;
    export type Instance = PumpIt;

    export type Key = BindKey;
    export const Scope = SCOPE;

    export namespace Options {
        export type Class<T extends ClassValue> = Omit<Partial<ClassOptions<T, AvailableScopes>>, "type">;
        export type Factory<T extends FactoryValue> = Omit<Partial<FactoryOptions<T, AvailableScopes>>, "type">;
    }
}
