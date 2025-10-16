import type { FC, ReactNode } from "react";

const Tx: FC<{
	label: string;
	children?: ReactNode;
}> = () => null;

export const Component1 = () => {
	return <Tx label="With children">Some content</Tx>;
};

export const Component2 = () => {
	const withVar = "test";
	return <Tx label={`Template ${withVar} children`}>Some content</Tx>;
};
