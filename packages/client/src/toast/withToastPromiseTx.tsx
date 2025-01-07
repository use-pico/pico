import { Tx } from "../tx/Tx";

export const withToastPromiseTx = (key: string) => {
	return {
		loading: <Tx label={`${key} - Loading (label)`} />,
		success: <Tx label={`${key} - Success (label)`} />,
		error: <Tx label={`${key} - Error (label)`} />,
	} as const;
};
