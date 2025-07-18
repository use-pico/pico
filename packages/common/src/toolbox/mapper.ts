import type { Merge } from "../type/merge";

export namespace Mapper {
	export type MapperFn<A extends object, B> = {
		[K in keyof B]: (input: A) => Promise<B[K]>;
	};
}

export const mapper = async <A extends object, B>(
	input: A,
	mapper: Mapper.MapperFn<A, B>,
): Promise<Merge<A, B>> => {
	const result: any = {
		...input,
	};

	for (const key in mapper) {
		result[key] = await mapper[key](input);
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
		foo: async ({ foo }) => Boolean(`${foo}-foo`),
		bla: async () => 45,
	},
);
