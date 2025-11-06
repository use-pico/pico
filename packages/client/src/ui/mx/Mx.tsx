import { translator } from "@use-pico/common/translator";
import type { FC } from "react";
import { Markdown } from "../markdown";

export namespace Mx {
	export interface Props extends Markdown.Props {
		label: string | undefined;
		fallback?: string;
	}
}

export const Mx: FC<Mx.Props> = ({ label, fallback, ...props }) => {
	return label ? (
		<Markdown {...props}>{translator.text(label, fallback)}</Markdown>
	) : null;
};
