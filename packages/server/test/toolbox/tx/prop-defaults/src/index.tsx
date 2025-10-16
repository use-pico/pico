import type { FC, ReactNode } from "react";

interface TxProps {
	label: string;
	size?: string;
}

interface StatusProps {
	textTitle?: string | ReactNode;
	textMessage?: string;
}

export const Tx: FC<TxProps> = ({ label, size = "Default size" }) => {
	return null;
};

export const Status: FC<StatusProps> = ({
	textTitle = "Default title",
	textMessage = "Default message",
}) => {
	return null;
};

export const OtherComponent: FC<{
	text: string;
}> = ({ text = "Should not extract" }) => {
	return null;
};

// Test nested JSX in expressions
export const NestedExample = () => {
	const mode = "any";
	return (
		<Status
			textTitle={
				mode === "any" ? "Nested in ternary" : "Alternative branch"
			}
		/>
	);
};
