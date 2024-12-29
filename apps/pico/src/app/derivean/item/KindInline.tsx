import { Tx } from "@use-pico/client";
import type { FC } from "react";
import type { ItemKindSchema } from "~/app/derivean/item/ItemKindSchema";

export namespace KindInline {
	export interface Props {
		kind: ItemKindSchema.Type;
	}
}

export const KindInline: FC<KindInline.Props> = ({ kind }) => {
	return (
		<div className={"flex flex-row gap-2"}>
			<Tx
				label={`Item kind - ${kind}`}
				css={{
					base: ["font-bold"],
				}}
			/>
			({kind})
		</div>
	);
};
