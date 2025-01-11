import { z } from "zod";

export const withIntSchema = () => {
	return z.union([
		z.number().int().nonnegative(),
		z
			.string()
			.transform((value) => parseInt(value, 10))
			.refine((value) => !isNaN(value)),
	]);
};
