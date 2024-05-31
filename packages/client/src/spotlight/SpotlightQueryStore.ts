import {SpotlightQuerySchema} from "@use-pico/common";
import {createQueryStore}     from "../query/createQueryStore";

export const SpotlightQueryStore = createQueryStore({
	name:   "SpotlightQueryStore",
	schema: SpotlightQuerySchema,
});
export type SpotlightQueryStore = typeof SpotlightQueryStore;
