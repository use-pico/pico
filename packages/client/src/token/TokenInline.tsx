import type { Entity } from "@use-pico/common";
import { type FC } from "react";
import { Tx } from "../tx/Tx";

export namespace TokenInline {
	export interface Props extends Entity.Type<{ token: string }> {}
}

export const TokenInline: FC<TokenInline.Props> = ({ entity }) => {
	return (
		<div className={"flex flex-row items-center gap-2"}>
			<span>
				<Tx label={`Token [${entity.token}]`} />
			</span>
			<span className={"text-slate-500 text-sm"}>({entity.token})</span>
		</div>
	);
};
