import {type z} from "zod";

export const mapSchema = <TSchema extends z.ZodSchema>(items: z.infer<TSchema>[], schema: TSchema) => {
    return items.filter(item => schema.safeParse(item).success)
        /**
         * Ensure an item satisfies the given schema
         */
        .map(item => schema.parse(item));
};
