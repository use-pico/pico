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
	cls,
}) => {
	const { el } = tva(variant, cls);

	return <el.base.Div>{translator.rich(label, fallback)}</el.base.Div>;
};
