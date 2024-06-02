import {parseJson$} from "@use-pico/common";
import {type z}     from "zod";
import {useParam$}  from "./useParam$";

export const useJsonParam$ = <
	TSchema extends z.ZodSchema,
>(schema: TSchema, name: string): z.infer<TSchema> => {
	return parseJson$(schema, useParam$(name));
};
