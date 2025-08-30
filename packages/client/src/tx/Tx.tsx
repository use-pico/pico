import { translator } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Typo } from "../typo/Typo";

export namespace Tx {
	export interface Props extends Omit<Typo.Props, "label"> {
		label: string;
		fallback?: ReactNode;
	}
}

export const Tx: FC<Tx.Props> = ({ label, fallback, ...props }) => {
	return (
		<Typo
			label={translator.rich(label, fallback)}
			{...props}
		/>
	);
};
