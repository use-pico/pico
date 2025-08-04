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
					<div className={"flex flex-row gap-2"}>
						<InventoryItemPopupSelect
							mode="single"
							state={{
								set: setValue,
								value,
							}}
						/>

						<InventoryItemPopupSelect
							mode="multi"
							state={{
								set: setValue,
								value,
							}}
						/>
					</div>
					<div className={"flex flex-row gap-2 items-center"}>
						<Tx label={"Selected value"} />
						<div>{value ?? "-"}</div>
					</div>
				</div>
			</div>
		);
	},
});
