import type { FC } from "react";

const Tx: FC<{ label: string }> = () => null;

export const Component1 = () => {
	return <Tx label="Hello World" />;
};

export const Component2 = () => {
	return <Tx label="Another message" />;
};

export const Component3 = () => {
	const literal = "test";
	return <Tx label={`Template ${literal}`} />;
};

