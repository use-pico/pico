import type { Cls, Contract, Props } from "./types";
import { proxyOf } from "./utils/proxyOf";

// --- Core Types ---

export function cls<const TContract extends Contract<any, any, any>>(
	props: Props<TContract>,
): Cls<TContract> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
		use: null as any,
		contract: proxy,
	};
}
