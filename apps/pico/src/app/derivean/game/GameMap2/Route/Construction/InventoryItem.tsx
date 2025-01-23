import { useMutation } from "@tanstack/react-query";
import { Button, Icon, useInvalidator } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace InventoryItem {
	export interface Props {
		routeId: string;
		inventory: ResourcePanel.Inventory;
	}
}

export const InventoryItem: FC<InventoryItem.Props> = ({
	routeId,
	inventory,
}) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const routeResourceMutation = useMutation({
		async mutationFn({
			routeId,
			resourceId,
			transport,
		}: {
			routeId: string;
			resourceId: string;
			transport: number;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Route_Resource")
					.values({
						id: genId(),
						resourceId,
						routeId,
						amount: transport,
						type: "construction",
						priority: 0,
					})
					.execute();
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
				"justify-between",
				"p-4",
				"border",
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={ResourceIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className={"font-bold"}>{inventory.name}</div>
			</div>
			<div>
				<Button
					variant={{ variant: "secondary" }}
					iconEnabled={"icon-[icons8--plus]"}
					loading={routeResourceMutation.isPending}
					onClick={() => {
						routeResourceMutation.mutate({
							resourceId: inventory.resourceId,
							transport: inventory.transport,
							routeId,
						});
					}}
				/>
			</div>
		</div>
	);
};
