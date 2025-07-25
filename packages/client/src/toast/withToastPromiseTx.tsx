import type { ReactElement } from "react";
import { Tx } from "../tx/Tx";

export namespace withToastPromiseTx {
	export interface Text {
		loading: ReactElement;
		success: ReactElement;
		error: ReactElement;
	}
}

export const withToastPromiseTx = (key?: string): withToastPromiseTx.Text => {
	return (
		key
			? {
					loading: <Tx label={`${key} - Loading (label)`} />,
					success: <Tx label={`${key} - Success (label)`} />,
					error: <Tx label={`${key} - Error (label)`} />,
				}
			: {
					loading: <Tx label={"Loading... (toast)"} />,
					success: <Tx label={"Success (toast)"} />,
					error: <Tx label={"Error (toast)"} />,
				}
	) satisfies withToastPromiseTx.Text;
};
