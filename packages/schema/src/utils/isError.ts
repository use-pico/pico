import {ErrorSchema} from "../common/ErrorSchema";
import {parse$}      from "../schema/parse$";

export const isError = (input: any): input is ErrorSchema.Type => {
    return parse$(ErrorSchema, input).success;
};
