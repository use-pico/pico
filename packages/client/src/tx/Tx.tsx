import { translator } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { TxCls } from "./TxCls";

export namespace Tx {
	export interface Props extends TxCls.Props {
		label: string;
		fallback?: ReactNode;
	}
}

export const Tx: FC<Tx.Props> = ({
	label,
	fallback,
	variant,
	tva = TxCls,
	slot,
	token,
	override,
}) => {
	const classes = tva.create({
		variant,
		slot,
		token,
		override,
	});

	return (
		<div className={classes.base}>{translator.rich(label, fallback)}</div>
	);
};
