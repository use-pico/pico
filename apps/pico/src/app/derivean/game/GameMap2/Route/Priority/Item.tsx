import { useMutation } from "@tanstack/react-query";
import { Badge, Button, Icon, useInvalidator } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { PriorityPanel } from "~/app/derivean/game/GameMap2/Route/Priority/PriorityPanel";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Item {
	export interface Props {
		priority: PriorityPanel.Priority;
	}
}

export const Item: FC<Item.Props> = ({ priority }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const priorityMutation = useMutation({
		async mutationFn({
			routeResourceId,
			priority,
		}: {
			routeResourceId: string;
			priority: number;
		}) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Route_Resource")
					.set({
						priority: Math.max(0, priority),
					})
					.where("id", "=", routeResourceId)
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
				priorityMutation.isPending ?
					["pointer-events-none", "opacity-50"]
				:	undefined,
			])}
		>
			<div className={"flex flex-col gap-2"}>
				<div className={"flex flex-row gap-2 items-center"}>
					<Icon
						icon={ResourceIcon}
						css={{ base: ["text-slate-500"] }}
					/>
					<div className={"font-bold text-sm"}>{priority.name}</div>
					<Icon icon={"icon-[cil--arrow-right]"} />
					<div className={"text-xs"}>{priority.toName}</div>
				</div>

				<div className={"flex flex-row gap-2 items-center text-slate-500"}>
					<Badge>x{toHumanNumber({ number: priority.amount })}</Badge>
				</div>
			</div>
			<div className={"flex flex-row gap-2 items-center"}>
				<Badge>{toHumanNumber({ number: priority.priority })}</Badge>

				<Button
					variant={{ variant: "secondary" }}
					iconEnabled={"icon-[typcn--minus-outline]"}
					onClick={() => {
						priorityMutation.mutate({
							routeResourceId: priority.id,
							priority: priority.priority - 1,
						});
					}}
				/>
				<Button
					variant={{ variant: "secondary" }}
					iconEnabled={"icon-[mingcute--plus-line]"}
					onClick={() => {
						priorityMutation.mutate({
							routeResourceId: priority.id,
							priority: priority.priority + 1,
						});
					}}
				/>
			</div>
		</div>
	);
};
