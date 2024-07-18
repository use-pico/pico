import { VoidSchema } from "@use-pico/common";
import { withMutation } from "./withMutation";

/**
 * Utility method used to generate a dummy mutation handler.
 *
 * @group query
 */
export const withDummyMutation = withMutation({
	key: ["dummy"],
	schema: {
		request: VoidSchema,
		response: VoidSchema,
	},
	useCallback: () => async () => {
		return undefined;
	},
});

export type withDummyMutation = typeof withDummyMutation;
