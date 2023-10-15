import {z} from "@use-pico/utils";

export const BulkSchema = z.object({
    id:      z.string().nonempty({message: "Non-empty"}),
    service: z.string().nonempty({message: "Non-empty"}),
    name:    z.string().nonempty({message: "Non-empty"}),
    status:  z.number(),
    commit:  z.boolean(),
    created: z.string().nonempty({message: "Non-empty"}),
    userId:  z.string().nonempty({message: "Non-empty"}),
});
export type BulkSchema = typeof BulkSchema;
export namespace BulkSchema {
    export type Type = z.infer<BulkSchema>;
}
