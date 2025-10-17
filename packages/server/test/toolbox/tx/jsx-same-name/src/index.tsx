import type { FC } from "react";

const Title: FC<{
	title: string;
}> = () => null;

const Label: FC<{
	label: string;
}> = () => null;

const Text: FC<{
	text: string;
}> = () => null;

export const Component1 = () => {
	return <Title title="This is a title" />;
};

export const Component2 = () => {
	return <Label label="This is a label" />;
};

export const Component3 = () => {
	return <Text text="This is text" />;
};

export const Component4 = () => {
	const value = "dynamic";
	return <Title title={value ?? "Fallback title"} />;
};

export const Component5 = () => {
	return <Label label="Another label" />;
};

export const Component6 = () => {
	return <Text text={undefined ?? "Default text"} />;
};
