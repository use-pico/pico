import {type PicoSchema} from "../../api/PicoSchema";

export function withPartial<TSchema extends PicoSchema>(schema: TSchema) {
    return schema;
}
