import { flattie } from "flattie";

export const flatOf = <TSource extends Record<string, any>>(
	source: TSource,
) => {
	return flattie(source);
};
