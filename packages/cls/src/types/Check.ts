/**
 * Type-level utility to check if a condition is met
 */
export type Check<
	TRequired extends boolean,
	TFulfilled extends boolean | undefined,
> = TRequired extends true ? (TFulfilled extends true ? true : false) : true;
