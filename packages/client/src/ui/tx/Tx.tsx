import { translator } from "@use-pico/common/translator";
import type { FC } from "react";
import { Typo } from "../typo/Typo";

export namespace Tx {
	export interface Props extends Omit<Typo.Props, "label"> {
		label: string | undefined;
		fallback?: string;
	}
}

export const Tx: FC<Tx.Props> = ({ label, fallback, ...props }) => {
	return label ? (
		<Typo
			label={translator.text(label, fallback)}
			{...props}
		/>
	) : null;
};
