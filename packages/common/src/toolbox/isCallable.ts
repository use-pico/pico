import isCoolCallable from "is-callable";

export const isCallable = <T extends (...args: unknown[]) => unknown>(
	val: unknown,
): val is T => isCoolCallable(val);
