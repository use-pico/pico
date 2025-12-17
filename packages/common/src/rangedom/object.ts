import { list } from "./list";

export const object = <T extends Record<string, unknown>>(
	object: T,
): T[keyof T] => {
	const keys = Object.keys(object) as (keyof T)[];

	if (keys.length === 0) {
		throw new Error("Object is empty");
	}

	const key = list(keys);

	if (key === undefined) {
		throw new Error("Key is undefined");
	}

	return object[key];
};
