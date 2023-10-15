import {type RequiredKeys} from "./RequiredKeys";

export type PickRequired<T> = Pick<T, RequiredKeys<T>>;
