import { PopupSelect, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { withInventoryItemListQuery } from "~/app/inventory/query/withInventoryItemListQuery";
import { InventoryItemTable } from "~/app/inventory/ui/InventoryItemTable";

export namespace InventoryItemPopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<
			InventoryItemQuerySchema.Type,
			InventoryItemSchema.Type
		> {
		//
	}
}

export const InventoryItemPopupSelect: FC<InventoryItemPopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect
			withQuery={withInventoryItemListQuery()}
			table={InventoryItemTable}
			textTitle={<Tx label={"Select inventory item (title)"} />}
			textSelect={<Tx label={"Select inventory item (select)"} />}
			allowEmpty
			render={({ entities }) => (
				<div>
					{entities.map((entity) => (
						<div key={entity.id}>{entity.name}</div>
					))}
				</div>
			)}
			{...props}
		/>
	);
};
