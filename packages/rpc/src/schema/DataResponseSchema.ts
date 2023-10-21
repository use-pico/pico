import {
    withAny,
    withNullish,
    withObject
} from "@use-pico/schema";

export const DataResponseSchema = withObject({
    /**
     * Any can be here, because response schema is parsed separately by the
     * actual schema.
     */
    data: withNullish(withAny()),
});
