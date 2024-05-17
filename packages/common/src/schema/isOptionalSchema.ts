import {z} from "zod";

export const isOptionalSchema = (input: any): input is z.ZodOptional<any> => {
    return input instanceof z.ZodOptional;
};
