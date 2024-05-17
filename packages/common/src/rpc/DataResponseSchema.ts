import {z} from "zod";

export const DataResponseSchema = z.object({
    /**
     * Any can be here, because response schema is parsed separately by the
     * actual schema.
     */
    data: z.any().optional().nullable(),
});
