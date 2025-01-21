import { z } from "zod";

export const withFloatSchema = () => {
	return z.union([
		z.number(),
		z
			.string()
			.transform((value) => parseFloat(value))
			.refine((value) => !isNaN(value)),
	]);
};
