import { useMutation } from "@tanstack/react-query";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    Badge,
    Button,
    Icon,
    TrashIcon,
    Tx,
    useInvalidator,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { DemandPanel } from "~/app/derivean/game/GameMap2/Building/Demand/DemandPanel";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";
import { PackageIcon } from "~/app/derivean/icon/PackageIcon";

export namespace Item {
	export interface Props {
		mapId: string;
		userId: string;
		demand: DemandPanel.Demand;
	}
}

export const Item: FC<Item.Props> = ({ mapId, userId, demand }) => {
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
	const priorityUpMutation = useMutation({
		async mutationFn({ demandId }: { demandId: string }) {
			return kysely.transaction().execute(async (tx) => {
				const { priority } = await tx
					.selectFrom("Demand as d")
					.select((eb) => eb.fn.max("d.priority").as("priority"))
					.where("d.mapId", "=", mapId)
					.where("d.userId", "=", userId)
					.where("d.id", "!=", demandId)
					.executeTakeFirstOrThrow();

				return tx
					.updateTable("Demand")
					.set({ priority: priority + 1 })
					.where("id", "=", demandId)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const priorityDownMutation = useMutation({
		async mutationFn({ demandId }: { demandId: string }) {
			return kysely.transaction().execute(async (tx) => {
				const { priority } = await tx
					.selectFrom("Demand as d")
					.select((eb) => eb.fn.min("d.priority").as("priority"))
					.where("d.mapId", "=", mapId)
					.where("d.userId", "=", userId)
					.where("d.id", "!=", demandId)
					.executeTakeFirstOrThrow();

				return tx
					.updateTable("Demand")
					.set({ priority: priority - 1 })
					.where("id", "=", demandId)
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
				"flex-col",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded-sm",
				"border-slate-200",
				demand.transport ?
					["text-green-600", "bg-green-50", "border-green-400"]
				:	undefined,
			])}
		>
			<div
				className={"flex flex-row gap-2 items-center justify-between w-full"}
			>
				<div className={"flex flex-row gap-2 items-center"}>
					{(demand.transport || 0) > 0 ?
						<Icon icon={DemandIcon} />
					:	<Icon icon={PackageIcon} />}
					<div className={"font-bold"}>{demand.name}</div>
				</div>

				<div className={"flex flex-row gap-2 items-center"}>
					<Badge
						css={{
							base:
								demand.transport ?
									[
										"bg-green-50",
										"border-green-400",
										"hover:bg-green-50",
										"hover:border-green-400",
									]
								:	undefined,
						}}
					>
						x{toHumanNumber({ number: demand.amount })}
					</Badge>

					<Button
						iconEnabled={TrashIcon}
						loading={deleteDemandMutation.isPending}
						onClick={() => {
							deleteDemandMutation.mutate({ demandId: demand.id });
						}}
						variant={{ variant: "danger" }}
					/>
				</div>
			</div>

			<div
				className={"flex flex-row gap-2 items-center justify-between w-full"}
			>
				<Button
					iconEnabled={ArrowUpIcon}
					variant={{ variant: "subtle" }}
					loading={
						priorityUpMutation.isPending || priorityDownMutation.isPending
					}
					onClick={() => {
						priorityUpMutation.mutate({ demandId: demand.id });
					}}
				>
					<Tx label={"Priority up (label)"} />
				</Button>
				<Badge
					css={{
						base: ["bg-purple-50", "border-purple-400", "text-purple-600"],
					}}
				>
					{demand.priority}
				</Badge>
				<Button
					iconEnabled={ArrowDownIcon}
					variant={{ variant: "subtle" }}
					loading={
						priorityUpMutation.isPending || priorityDownMutation.isPending
					}
					onClick={() => {
						priorityDownMutation.mutate({ demandId: demand.id });
					}}
				>
					<Tx label={"Priority down (label)"} />
				</Button>
			</div>
		</div>
	);
};
