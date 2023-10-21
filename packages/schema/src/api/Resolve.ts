export type Resolve<T> = T;

export namespace Resolve {
    export type Object<T> = Resolve<{ [k in keyof T]: T[k] }>;
}
