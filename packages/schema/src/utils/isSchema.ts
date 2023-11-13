import {type PicoSchema} from "../api/PicoSchema";
import {parse$}          from "../schema/parse$";

export const isSchema = <TSchema extends PicoSchema>(input: any, schema: TSchema): input is PicoSchema.Output<TSchema> => {
    return parse$(schema, input).success;
};
