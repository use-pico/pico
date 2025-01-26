import { useMutation } from "@tanstack/react-query";
import { Button, TrashIcon, useInvalidator } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { DemandPanel } from "~/app/derivean/game/GameMap2/Demand/DemandPanel";

export namespace Item {
	export interface Props {
		demand: DemandPanel.Demand;
	}
}

export const Item: FC<Item.Props> = ({ demand }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteDemandMutation = useMutation({
		async mutationFn({ demandId }: { demandId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx.deleteFrom("Demand").where("id", "=", demandId).execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div
			className={tvc([
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded-sm",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>{demand.name}</div>

			<Button
				iconEnabled={TrashIcon}
				loading={deleteDemandMutation.isPending}
				onClick={() => {
					deleteDemandMutation.mutate({ demandId: demand.id });
				}}
				variant={{ variant: "danger" }}
			/>
		</div>
	);
};
