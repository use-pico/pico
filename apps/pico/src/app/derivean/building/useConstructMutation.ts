import { useMutation } from "@tanstack/react-query";
import { toast, useSourceInvalidator } from "@use-pico/client";
import { translator } from "@use-pico/common";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingQueueSource } from "~/app/derivean/building/queue/BuildingQueueSource";
import { withConstruct } from "~/app/derivean/building/withConstruct";
import { kysely } from "~/app/derivean/db/db";
import { InventorySource } from "~/app/derivean/inventory/InventorySource";

export namespace useConstructMutation {
	export interface Props {
		userId: string;
	}
}

export const useConstructMutation = ({
	userId,
}: useConstructMutation.Props) => {
	const invalidator = useSourceInvalidator({
		sources: [
			BuildingQueueSource,
			BuildingSource,
			BaseBuildingSource,
			InventorySource,
		],
		queries: [["useBuildingCount"]],
	});

	return useMutation({
		mutationKey: ["useConstructMutation"],
		async mutationFn({ baseBuildingId }: { baseBuildingId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return toast.promise(
					withConstruct({
						tx,
						baseBuildingId,
						userId,
					}),
					{
						success: translator.text("Building queued."),
						error: translator.text("Failed to queue building."),
						loading: translator.text("Queuing building..."),
					},
				);
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
