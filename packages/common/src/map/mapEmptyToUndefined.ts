import { isObject } from "../is-object/isObject";

export const mapEmptyToUndefined = <T extends Record<string, unknown>>(
	object: T,
): T => {
	return Object.keys(object).reduce(
		(acc, key) => {
			const value = object[key];

			if (value === "") {
				(acc as Record<string, unknown>)[key] = undefined;
			} else if (isObject(value)) {
				(acc as Record<string, unknown>)[key] = mapEmptyToUndefined(
					value as Record<string, unknown>,
				);
			} else {
				(acc as Record<string, unknown>)[key] = value;
			}

			return acc;
		},
		{
			...object,
		} as T,
	);
};
