import type { Entity } from "@use-pico/common/type";
import type { FC, Ref } from "react";
import { Tx } from "../tx/Tx";

export namespace TokenInline {
	export interface Props
		extends Entity.Type<{
			token: string;
		}> {
		ref?: Ref<HTMLDivElement>;
	}
}

export const TokenInline: FC<TokenInline.Props> = ({ ref, entity }) => {
	return (
		<div
			ref={ref}
			data-ui="TokenInline-root"
			className={"inline-flex flex-row items-center gap-2"}
		>
			<span data-ui="TokenInline-root-label">
				<Tx label={`Token [${entity.token}]`} />
			</span>
			<span
				data-ui="TokenInline-root-token"
				className={"text-slate-500 text-sm"}
			>
				({entity.token})
			</span>
		</div>
	);
};
