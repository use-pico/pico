import { cssOf, WithEntity } from "@use-pico/common";
import { type FC } from "react";
import { td } from "../i18n/td";

export namespace TokenInline {
	export interface Props extends WithEntity<{ token: string }> {}
}

export const TokenInline: FC<TokenInline.Props> = ({ entity }) => {
	return (
		<div className={cssOf("flex flex-row items-center gap-2")}>
			<span>{td()(`Token [${entity.token}]`)}</span>
			<span className={cssOf("text-slate-500 text-sm")}>({entity.token})</span>
		</div>
	);
};
