import { z } from "zod";

export const withBoolSchema = () => {
	return z.union([
		z.boolean(),
		z.stringbool(),
		z
			.number()
			.int()
			.refine((val) => val === 0 || val === 1)
			.transform((val) => (typeof val === "boolean" ? val : val === 1)),
	]);
};
