import { createFileRoute } from "@tanstack/react-router";
import { useSelection } from "@use-pico/client";
import { InventoryItemPopupSelect } from "~/app/inventory/ui/InventoryItemPopupSelect";

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		const single = useSelection();
		const multi = useSelection();

		return (
			<div>
				<div>
					<div className={"flex flex-col gap-2 w-fit"}>
						<InventoryItemPopupSelect
							mode="single"
							state={single}
						/>

						<InventoryItemPopupSelect
							mode="multi"
							state={multi}
						/>
					</div>
				</div>
			</div>
		);
	},
});
