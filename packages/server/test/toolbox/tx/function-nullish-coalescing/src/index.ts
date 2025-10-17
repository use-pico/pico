const t = (text: string) => text;

interface Item {
	name?: string;
}

const selection = {
	optional: {
		single: (): Item | undefined => ({
			name: "test",
		}),
	},
};

export const example1 = () => {
	return t(selection.optional.single()?.name ?? "Default category name");
};

export const example2 = () => {
	const item = selection.optional.single();
	return t(item?.name ?? "Fallback message");
};

export const example3 = () => {
	return t(undefined ?? "Another default");
};

export const example4 = () => {
	const value: string | undefined = undefined;
	return t(value ?? "Final fallback");
};

export const example5 = () => {
	const maybeText = Math.random() > 0.5 ? "Something" : undefined;
	return t(maybeText ?? "Random fallback");
};
