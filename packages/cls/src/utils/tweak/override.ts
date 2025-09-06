import type { Contract } from "../../types/Contract";
import type { Tweak } from "../../types/Tweak";

export const override = <
	TContract extends Contract.Any,
>(): Tweak.Override.Type<TContract> => ({
	token: (token) => token,
});
