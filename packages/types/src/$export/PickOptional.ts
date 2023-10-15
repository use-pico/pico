import {type OptionalKeys} from "./OptionalKeys";

export type PickOptional<T> = Pick<T, OptionalKeys<T>>;
