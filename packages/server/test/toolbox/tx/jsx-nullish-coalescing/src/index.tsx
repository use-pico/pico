import type { FC } from "react";

const Tx: FC<{
	label: string;
}> = () => null;

const Component: FC<{
	title: string;
}> = () => null;

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

export const Component1 = () => {
	return (
		<Component
			title={
				selection.optional.single()?.name ?? "Listing category (title)"
			}
		/>
	);
};

export const Component2 = () => {
	const item = selection.optional.single();
	return <Tx label={item?.name ?? "Fallback translation"} />;
};

export const Component3 = () => {
	return <Tx label={undefined ?? "Another fallback"} />;
};

export const Component4 = () => {
	const value: string | undefined = undefined;
	return <Component title={value ?? "Default title"} />;
};
