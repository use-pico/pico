import {type SourceSchema} from "@use-pico/source";

export interface IRepository<TSourceSchema extends SourceSchema<any, any, any, any>> {
    readonly schema: TSourceSchema;
}
