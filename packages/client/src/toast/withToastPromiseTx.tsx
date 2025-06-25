import { Tx } from "../tx/Tx";

export const withToastPromiseTx = (key?: string) => {
	return key
		? {
				loading: <Tx label={`${key} - Loading (label)`} />,
				success: <Tx label={`${key} - Success (label)`} />,
				error: <Tx label={`${key} - Error (label)`} />,
			}
		: ({
				loading: <Tx label={"Loading... (toast)"} />,
				success: <Tx label={"Success (toast)"} />,
				error: <Tx label={"Error (toast)"} />,
			} as const);
};
