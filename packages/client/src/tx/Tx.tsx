import { useCls } from "@use-pico/cls";
import { translator } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { TxCls } from "./TxCls";

export namespace Tx {
	export interface Props extends TxCls.Props {
		label: string;
		fallback?: ReactNode;
	}
}

export const Tx: FC<Tx.Props> = ({ label, fallback, tva = TxCls, cls }) => {
	const slots = useCls(tva, cls);

	return (
		<div className={slots.base()}>{translator.rich(label, fallback)}</div>
	);
};
