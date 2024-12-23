import { Tx } from "@use-pico/client";
import type { FC } from "react";

export namespace KindInline {
	export interface Props {
		kind: string;
	}
}

export const KindInline: FC<KindInline.Props> = ({ kind }) => {
	return (
		<div className={"flex flex-row gap-2"}>
			<Tx
				label={`Blueprint kind - ${kind}`}
				css={{
					base: ["font-bold"],
				}}
			/>
			({kind})
		</div>
	);
};
