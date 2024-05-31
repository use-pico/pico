import {z} from "zod";

export const isObjectSchema = (input: any): input is z.ZodObject<any> => {
	return input instanceof z.ZodObject;
};
