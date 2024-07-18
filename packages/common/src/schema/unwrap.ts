import { z } from "zod";

export const unwrap = (schema: any): z.ZodSchema => {
	return "unwrap" in schema ? schema.unwrap() : schema;
};
