import { isObject } from "./isObject";

export const mapEmptyToUndefined = <T extends Record<string, any>>(
	object: T,
): T => {
	return Object.keys(object).reduce(
		(acc, key) => {
			const value = object[key];

			if (value === "") {
				(acc as Record<string, any>)[key] = undefined;
			} else if (isObject(value)) {
				(acc as Record<string, any>)[key] = mapEmptyToUndefined(value);
			} else {
				(acc as Record<string, any>)[key] = value;
			}

			return acc;
		},
		{
			...object,
		} as T,
	);
};
