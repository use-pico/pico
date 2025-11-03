import isCoolString from "is-string";

export const isString = (val: unknown): val is string => isCoolString(val);
