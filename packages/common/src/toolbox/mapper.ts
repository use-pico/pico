import type { Merge } from "../type/Merge";

export namespace mapper {
	export type MapperFn<A extends object, B extends object> = Merge<
		{
			[K in keyof A]?: (input: A) => A[K];
		},
		{
			[K in keyof B]?: (input: A) => B[K];
		}
	>;
}

export const mapper = <A extends object, B extends object>(
	input: A,
	mapper: mapper.MapperFn<A, B>,
): Merge<A, B> => {
	const result = {
		...input,
	} as Record<string, unknown>;

	for (const key in mapper) {
		const fn = mapper[key as keyof typeof mapper];
		if (fn) {
			result[key] = fn(input);
		}
	}

	return result as Merge<A, B>;
};
