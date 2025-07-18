import type { Merge } from "../type/merge";

export namespace Mapper {
	export type MapperFn<A extends object, B> = Partial<{
		[K in keyof (B & A)]: (input: A) => Promise<(B & A)[K]>;
	}>;
}

export const mapper = async <A extends object, B>(
	input: A,
	mapper: Mapper.MapperFn<A, B>,
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

// Usage example
const bla = await mapper(
	{
		foo: "bar",
		bar: "foo",
	},
	{
		foo: undefined,
		bla: async () => 45,
	},
);
