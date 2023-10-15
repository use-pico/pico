import {ErrorResponseSchema} from "../schema/ErrorResponseSchema";

export const isError = (input: any): input is ErrorResponseSchema.Type => {
    return ErrorResponseSchema.safeParse(input).success;
};
