import { Select, Tx } from "@use-pico/client";
import type { FC } from "react";
import { ItemKind } from "~/app/derivean/item/ItemKind";
import type { ItemKindSchema } from "~/app/derivean/item/ItemKindSchema";
import { KindInline } from "~/app/derivean/item/KindInline";

export namespace ItemKindSelect {
	export interface Type {
		id: string;
		value: ItemKindSchema.Type;
	}

	export interface Props extends Select.PropsEx<ItemKindSelect.Type> {
		//
	}
}

export const ItemKindSelect: FC<ItemKindSelect.Props> = (props) => {
	return (
		<Select<ItemKindSelect.Type>
			textSelect={<Tx label={"Select item kind (label)"} />}
			items={ItemKind.map((type) => ({
				id: type,
				value: type,
			}))}
			render={({ entity }) => <KindInline kind={entity.value} />}
			{...props}
		/>
	);
};
