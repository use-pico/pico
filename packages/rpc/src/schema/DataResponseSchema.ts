import {schema} from "@use-pico/schema";

export const DataResponseSchema = schema(z => z.object({
    /**
     * Any can be here, because response schema is parsed separately by the
     * actual schema.
     */
    data: z.any().nullish(),
}));
