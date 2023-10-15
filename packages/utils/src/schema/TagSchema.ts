import {z} from "zod";

export const TagSchema = z.object({
    id:    z.string().nonempty({message: "Non-empty"}),
    code:  z.string().nonempty({message: "Non-empty"}),
    label: z.string().nonempty({message: "Non-empty"}),
    group: z.string().nonempty({message: "Non-empty"}),
    sort:  z.number().nullish(),
});
export namespace TagSchema {
    export type Schema = typeof TagSchema;
    export type Type = z.infer<Schema>;
}
