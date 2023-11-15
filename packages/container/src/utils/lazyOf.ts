import {
    type BindKey,
    get
} from "pumpit";

export const lazyOf = (key: BindKey) => get(key, {lazy: true});
