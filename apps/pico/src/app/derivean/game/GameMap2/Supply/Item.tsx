import { useMutation } from "@tanstack/react-query";
import { Button, TrashIcon, useInvalidator } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { SupplyPanel } from "~/app/derivean/game/GameMap2/Supply/SupplyPanel";

export namespace Item {
	export interface Props {
		supply: SupplyPanel.Supply;
	}
}

export const Item: FC<Item.Props> = ({ supply }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteSupplyMutation = useMutation({
		async mutationFn({ supplyId }: { supplyId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx.deleteFrom("Supply").where("id", "=", supplyId).execute();
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
			<div className={"flex flex-row gap-2 items-center"}>{supply.name}</div>

			<Button
				iconEnabled={TrashIcon}
				loading={deleteSupplyMutation.isPending}
				onClick={() => {
					deleteSupplyMutation.mutate({ supplyId: supply.id });
				}}
				variant={{ variant: "danger" }}
			/>
		</div>
	);
};
