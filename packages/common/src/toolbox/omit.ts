export const omit = <
	TValue extends Record<string, any>,
	TKeys extends keyof TValue,
>(
	value: TValue | undefined,
	omit: TKeys[],
): Omit<TValue, TKeys> | undefined => {
	if (!value) {
		return undefined;
	}

	const result = {
		...value,
	};

	omit.forEach((key) => {
		delete result[key];
	});

	return result;
};
