import { createFileRoute } from "@tanstack/react-router";
import { Tx } from "@use-pico/client";
import { useState } from "react";
import { InventoryItemPopupSelect } from "~/app/inventory/ui/InventoryItemPopupSelect";

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		const [value, setValue] = useState<string[]>([]);

		return (
			<div>
				<div>
					<InventoryItemPopupSelect
						state={{
							set: setValue,
							value,
						}}
					/>
					<div className={"flex flex-row gap-2 items-center"}>
						<Tx label={"Selected value"} />
						<div>{value ?? "-"}</div>
					</div>
				</div>
			</div>
		);
	},
});
