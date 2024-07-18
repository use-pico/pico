export namespace diffOf {
	export type Type = (string | number)[];
}

export const diffOf = (alfa: diffOf.Type, beta: diffOf.Type): diffOf.Type =>
	alfa.filter((x) => !beta.includes(x));
