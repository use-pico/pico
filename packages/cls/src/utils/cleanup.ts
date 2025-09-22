import type { Tweak } from "../types/Tweak";
import { filter } from "./filter";

export const cleanup = <TTweak extends Tweak.Type<any>>(
	tweak: TTweak,
): TTweak => {
	return {
		token: filter(tweak.token),
		slot: filter(tweak.slot),
		override: filter(tweak.override),
		variant: filter(tweak.variant),
	} as TTweak;
};
