import { createFileRoute } from "@tanstack/react-router";
import { useSelection } from "@use-pico/client/hook";
import type { InventoryItemSchema } from "~/app/inventory/db/InventoryItemSchema";
import { InventoryItemPopupSelect } from "~/app/inventory/ui/InventoryItemPopupSelect";

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		const single = useSelection<InventoryItemSchema.Type>({
			mode: "single",
		});
		const multi = useSelection<InventoryItemSchema.Type>({
			mode: "multi",
		});

		return (
			<div>
				<div>
					<div className={"flex flex-col gap-2 w-fit"}>
						<InventoryItemPopupSelect selection={single} />

						<InventoryItemPopupSelect selection={multi} />
					</div>
				</div>
			</div>
		);
	},
});
