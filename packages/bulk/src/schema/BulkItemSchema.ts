import {z}          from "@pico/utils";
import {BulkSchema} from "./BulkSchema";

export const BulkItemSchema = z.object({
    id:       z.string().nonempty({message: "Non-empty"}),
    bulkId:   z.string().nonempty({message: "Non-empty"}),
    bulk:     BulkSchema,
    service:  z.string().nonempty({message: "Non-empty"}),
    status:   z.number(),
    values:   z.any().nullish(),
    request:  z.any().nullish(),
    response: z.any().nullish(),
    created:  z.string().nonempty({message: "Non-empty"}),
    userId:   z.string().nonempty({message: "Non-empty"}),
});
export type BulkItemSchema = typeof BulkItemSchema;
export namespace BulkItemSchema {
    export type Type = z.infer<BulkItemSchema>;
}
