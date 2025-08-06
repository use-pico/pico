import type { Cls, Contract, HasBaseInUseChain } from "./types";

export function cls2cls<
	Base extends Contract<any, any, any>,
	Sub extends Contract<any, any, any>,
>(
	_: Cls<Base>,
	sub: Cls<Sub> & {
		contract: HasBaseInUseChain<Sub, Base> extends true
			? unknown
			: [
					"❌ Not derived from Base contract",
					{
						sub: Sub;
						base: Base;
					},
				];
	},
): Cls<Base> {
	return sub as unknown as Cls<Base>;
}
