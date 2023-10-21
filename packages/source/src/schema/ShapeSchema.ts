import {
    type ObjectSchema,
    type Schema
} from "@use-pico/schema";

export type ShapeSchema<TShape extends ObjectSchema.Shape = ObjectSchema.Shape> = ObjectSchema<TShape>;
export namespace ShapeSchema {
    export type Type<TShape extends ObjectSchema.Shape = ObjectSchema.Shape> = Schema.Infer<ShapeSchema<TShape>>;
}
