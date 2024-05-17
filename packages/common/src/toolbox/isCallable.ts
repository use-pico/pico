import isCoolCallable from "is-callable";

export const isCallable = <T extends (...arg: any[]) => any>(
    val: any
): val is T => isCoolCallable(val);
