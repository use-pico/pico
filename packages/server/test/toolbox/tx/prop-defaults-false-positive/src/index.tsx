/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: Test */
/** biome-ignore-all lint/correctness/noUnusedVariables: test */
import type { FC } from "react";

interface TxProps {
	label: string;
}

// This SHOULD extract
export const Tx: FC<TxProps> = ({ label = "Extract this default" }) => {
	return null;
};

// This should NOT extract - same prop name but different component
export const OtherComponent: FC<{
	label: string;
}> = ({ label = "Should not extract" }) => {
	return null;
};

// This should NOT extract - destructuring in a regular function
const processData = ({ label = "Should not extract from function" }) => {
	return label;
};

// This should NOT extract - destructuring in const
const data = {
	label: "Should not extract from const",
};
const { label } = data;

// This should NOT extract - object literal
const config = {
	label: "Should not extract from object",
};
