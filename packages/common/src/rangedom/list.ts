import { rangedom } from "./rangedom";

export const list = <T>(list: T[]): T => {
	if (list.length === 0) {
		throw new Error("List is empty");
	}

	const item = list[rangedom(0, list.length - 1)];

	if (item === undefined) {
		throw new Error("Item is undefined");
	}

	return item;
};
