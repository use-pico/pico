import type { FC, ReactNode } from "react";

const Tx: FC<{
	label: string;
	fake?: string;
	children?: ReactNode;
}> = () => null;

export const Component1 = () => {
	const item = "foo";

	return (
		<Tx
			key={`${item}-item`}
			label="With children"
			fake="should not extract this"
		>
			Some content
		</Tx>
	);
};

export const Component2 = () => {
	const withVar = "test";
	return <Tx label={`Template ${withVar} children`}>Some content</Tx>;
};
