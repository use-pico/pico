export const isObject = (value: unknown): value is object => {
	return typeof value === "object" && !Array.isArray(value) && value !== null;
};
