import { useMutation } from "@tanstack/react-query";
import { Button, Icon, useInvalidator } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { InventoryTypeInline } from "~/app/derivean/inventory/InventoryTypeInline";

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
			type,
		}: {
			routeId: string;
			resourceId: string;
			transport: number;
			type: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.insertInto("Route_Resource")
					.values({
						id: genId(),
						resourceId,
						routeId,
						amount: transport,
						type,
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
			<div className={"flex flex-col gap-2"}>
				<div className={"flex flex-row gap-2 items-center"}>
					<Icon
						icon={ResourceIcon}
						css={{ base: ["text-slate-500"] }}
					/>
					<div className={"font-bold"}>{inventory.name}</div>
				</div>
				<InventoryTypeInline
					label={inventory.type}
					css={{ base: ["text-xs", "text-slate-500"] }}
				/>
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
							type: inventory.type,
							routeId,
						});
					}}
				/>
			</div>
		</div>
	);
};
