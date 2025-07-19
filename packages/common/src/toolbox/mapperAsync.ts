import type { Merge } from "../type/Merge";

export namespace mapperAsync {
	export type MapperFn<A extends object, B extends object> = Merge<
		{
			[K in keyof A]?: (input: A) => Promise<A[K]>;
		},
		{
			[K in keyof B]?: (input: A) => Promise<B[K]>;
		}
	>;
}

export const mapperAsync = async <A extends object, B extends object>(
	input: A,
	mapper: mapperAsync.MapperFn<A, B>,
): Promise<Merge<A, B>> => {
	const result: any = {
		...input,
	};

	for (const key in mapper) {
		const fn = mapper[key as keyof typeof mapper];
		if (fn) {
			result[key] = await fn(input);
		}
	}

	return result as Merge<A, B>;
};
