import { z } from "zod";

export const withIntSchema = () => {
	return z.union([
		z.number().int(),
		z
			.string()
			.transform((value) => parseInt(value, 10))
			.refine((value) => !Number.isNaN(value)),
	]);
};
