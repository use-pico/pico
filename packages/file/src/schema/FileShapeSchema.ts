import {z} from "@pico/utils";

export const FileShapeSchema = z.object({
    name:   z.string().nonempty({message: "Non-empty"}),
    path:   z.string().nonempty({message: "Non-empty"}),
    native: z.string().nonempty({message: "Non-empty"}),
    mime:   z.string().nonempty({message: "Non-empty"}),
    userId: z.string().nullish(),
    size:   z.number(),
    ttl:    z.number(),
});
export type FileShapeSchema = typeof FileShapeSchema;
export namespace FileShapeSchema {
    export type Type = z.infer<FileShapeSchema>;
}
