import { translator } from "@use-pico/common";
import { type FC, memo, type ReactNode } from "react";
import { TxCls } from "./TxCls";

export namespace Tx {
	export interface Props extends TxCls.Props {
		label: string;
		fallback?: ReactNode;
	}
}

export const Tx: FC<Tx.Props> = memo(
	({ label, fallback, variant, tva = TxCls, cls }) => {
		const { slots } = tva(variant, cls);

		return (
			<div className={slots.base()}>
				{translator.rich(label, fallback)}
			</div>
		);
	},
);
