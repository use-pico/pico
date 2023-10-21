import {
    type ObjectSchema,
    type PicoSchema
} from "@use-pico/schema";

export type ShapeSchema<TShape extends ObjectSchema.Shape = ObjectSchema.Shape> = ObjectSchema<TShape>;
export namespace ShapeSchema {
    export type Type<TShape extends ObjectSchema.Shape = ObjectSchema.Shape> = PicoSchema.Output<ShapeSchema<TShape>>;
}
