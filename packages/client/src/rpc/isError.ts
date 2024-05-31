import {ErrorSchema} from "@use-pico/common";

export const isError = (input: any): input is ErrorSchema.Type => {
	return ErrorSchema.safeParse(input).success;
};
