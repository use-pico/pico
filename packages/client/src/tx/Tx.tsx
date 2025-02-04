import { translator } from "@use-pico/common";
import { FC, ReactNode, memo } from "react";
import { TxCss } from "./TxCss";

export namespace Tx {
	export interface Props extends TxCss.Props {
		label: string;
		fallback?: ReactNode;
	}
}

export const Tx: FC<Tx.Props> = memo(
	({ label, fallback, variant, tva = TxCss, css }) => {
		const tv = tva({
			...variant,
			css,
		}).slots;
		return <div className={tv.base()}>{translator.rich(label, fallback)}</div>;
	},
);
