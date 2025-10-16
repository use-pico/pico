import type { FC } from "react";

const Tx: FC<{
	label: string;
	fake?: string;
}> = () => null;

export const Component1 = () => {
	return <Tx label="Hello World" />;
};

export const Component2 = () => {
	return (
		<Tx
			label="Another message"
			fake="this should not be extracted"
		/>
	);
};

export const Component3 = () => {
	const literal = "test";
	return <Tx label={`Template ${literal}`} />;
};
