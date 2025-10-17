const translator = {
	text: (text: string) => text,
};

interface Item {
	title?: string;
}

const selection = {
	optional: {
		single: (): Item | undefined => ({
			title: "test",
		}),
	},
};

export const example1 = () => {
	return translator.text(
		selection.optional.single()?.title ?? "Default object method text",
	);
};

export const example2 = () => {
	const item = selection.optional.single();
	return translator.text(item?.title ?? "Fallback object method");
};

export const example3 = () => {
	return translator.text(undefined ?? "Another object default");
};

export const example4 = () => {
	const value: string | undefined = undefined;
	return translator.text(value ?? "Final object fallback");
};
