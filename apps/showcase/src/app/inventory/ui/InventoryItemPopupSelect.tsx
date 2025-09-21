import { Badge, More, PopupSelect, Tx } from "@use-pico/client";
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
			renderMulti={({ entities }) => (
				<More
					// limit={1}
					items={entities.map((entity) => ({
						id: entity.id,
						label: entity.name,
					}))}
					renderInline={({ entity }) => (
						<Badge
							key={`${entity.id}-inline`}
							tweak={{
								variant: {
									size: "xs",
									border: false,
								},
							}}
						>
							{entity.label}
						</Badge>
					)}
					renderItem={({ entity }) => (
						<Badge
							key={`${entity.id}-item`}
							tweak={{
								variant: {
									size: "xs",
								},
							}}
						>
							{entity.label}
						</Badge>
					)}
				/>
			)}
			{...props}
		/>
	);
};
