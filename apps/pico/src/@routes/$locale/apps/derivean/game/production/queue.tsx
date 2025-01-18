import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
    Badge,
    Button,
    Icon,
    LinkTo,
    TrashIcon,
    useInvalidator,
    withList,
} from "@use-pico/client";
import {
    Kysely,
    toHumanNumber,
    withBoolSchema,
    withJsonArraySchema,
    type Entity,
} from "@use-pico/common";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { RequirementsInline } from "~/app/derivean/root/RequirementsInline";

const OutputSchema = z.object({
	id: z.string().min(1),
	blueprintProductionId: z.string().min(1),
	blueprintId: z.string().min(1),
	name: z.string().min(1),
	resource: z.string().min(1),
	amount: z.number().nonnegative(),
	count: z.number().nonnegative(),
	limit: z.number().nonnegative(),
	priority: z.number(),
	requirements: withJsonArraySchema(
		z.object({
			id: z.string().min(1),
			amount: z.number().nonnegative(),
			passive: withBoolSchema(),
			resourceId: z.string().min(1),
			name: z.string().min(1),
		}),
	),
});

type OutputSchema = typeof OutputSchema;

namespace QueueItem {
	export interface Props extends Entity.Schema<OutputSchema> {
		//
	}
}

const QueueItem: FC<QueueItem.Props> = ({ entity }) => {
	const { locale } = useParams({ from: "/$locale" });
	const invalidator = useInvalidator([["Management"]]);
	const priorityMutation = useMutation({
		async mutationFn({ id, priority }: { id: string; priority: number }) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Production_Queue")
					.set({ priority })
					.where("id", "=", id)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const limitMutation = useMutation({
		async mutationFn({ id, limit }: { id: string; limit: number }) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.updateTable("Production_Queue")
					.set({ limit })
					.where("id", "=", id)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const deleteMutation = useMutation({
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.deleteFrom("Production_Queue")
					.where("id", "=", entity.id)
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div
			className={
				"flex flex-row items-center justify-between border border-slate-300 p-2 rounded-md hover:bg-slate-50 hover:border-slate-500"
			}
		>
			<div className={"flex flex-row gap-6"}>
				<div className={"flex flex-row items-center gap-2 font-bold"}>
					<LinkTo
						icon={BuildingIcon}
						to={"/$locale/apps/derivean/game/map"}
						params={{ locale }}
						search={{ blueprintId: entity.blueprintId }}
					>
						{entity.name}
					</LinkTo>
				</div>

				<div className={"flex flex-row items-center gap-2"}>
					<Icon
						icon={ResourceIcon}
						css={{ base: ["text-slate-400"] }}
					/>
					<div>{entity.resource}</div>
					<Badge>x{toHumanNumber({ number: entity.amount })}</Badge>
				</div>

				<div className={"flex flex-row items-center gap-2"}>
					<Icon
						icon={"icon-[fluent--text-word-count-20-regular]"}
						css={{ base: ["text-slate-400"] }}
					/>
					<Badge>
						{toHumanNumber({ number: entity.count })}
						{entity.limit > 0 ?
							` / ${toHumanNumber({ number: entity.limit })}`
						:	null}
					</Badge>
				</div>

				<div className={"flex flex-row items-center gap-2 font-bold"}>
					<Icon
						icon={"icon-[material-symbols-light--low-priority-rounded]"}
						css={{ base: ["text-slate-400"] }}
					/>
					<Badge>{toHumanNumber({ number: entity.priority })}</Badge>
				</div>
			</div>
			<div className={"flex flex-row gap-2 items-center"}>
				<RequirementsInline requirements={entity.requirements} />
				<Button
					iconEnabled={"icon-[ph--minus-fill]"}
					iconDisabled={"icon-[ph--minus-fill]"}
					loading={limitMutation.isPending}
					disabled={entity.limit === 0}
					onClick={() => {
						limitMutation.mutate({
							id: entity.id,
							limit: Math.max(0, entity.limit - 1),
						});
					}}
				/>
				<Button
					iconEnabled={"icon-[ph--plus-fill]"}
					loading={limitMutation.isPending}
					onClick={() => {
						limitMutation.mutate({
							id: entity.id,
							limit: entity.limit + 1,
						});
					}}
				/>

				<Button
					iconEnabled={"icon-[bx--down-arrow]"}
					iconDisabled={"icon-[bx--down-arrow]"}
					loading={priorityMutation.isPending}
					disabled={entity.priority === 0}
					onClick={() => {
						priorityMutation.mutate({
							id: entity.id,
							priority: entity.priority - 5,
						});
					}}
				/>
				<Button
					iconEnabled={"icon-[bx--up-arrow]"}
					loading={priorityMutation.isPending}
					onClick={() => {
						priorityMutation.mutate({
							id: entity.id,
							priority: entity.priority + 5,
						});
					}}
				/>

				<Button
					iconEnabled={TrashIcon}
					loading={deleteMutation.isPending}
					variant={{ variant: "danger" }}
					onClick={() => {
						deleteMutation.mutate();
					}}
				/>
			</div>
		</div>
	);
};

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/production/queue",
)({
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();
		const data = await queryClient.ensureQueryData({
			queryKey: ["Management", "Production-Queue", user.id],
			queryFn: async () => {
				return withList({
					select: kysely
						.selectFrom("Production_Queue as pq")
						.innerJoin(
							"Blueprint_Production as bp",
							"bp.id",
							"pq.blueprintProductionId",
						)
						.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
						.innerJoin("Resource as r", "r.id", "bp.resourceId")
						.select([
							"pq.id",
							"pq.blueprintProductionId",
							"bl.name",
							"bl.id as blueprintId",
							"r.name as resource",
							"bp.amount",
							"pq.priority",
							"pq.count",
							"pq.limit",
							(eb) =>
								eb
									.selectFrom("Blueprint_Production_Requirement as bpr")
									.innerJoin("Resource as r2", "r2.id", "bpr.resourceId")
									.select([
										(eb) => {
											return Kysely.jsonGroupArray({
												id: eb.ref("bpr.id"),
												amount: eb.ref("bpr.amount"),
												passive: eb.ref("bpr.passive"),
												name: eb.ref("r2.name"),
												blueprintId: eb.ref("bp.id"),
												resourceId: eb.ref("bpr.resourceId"),
											}).as("requirements");
										},
									])
									.whereRef(
										"bpr.blueprintProductionId",
										"=",
										"pq.blueprintProductionId",
									)
									.as("requirements"),
						])
						.where("userId", "=", user.id)
						.orderBy("priority", "desc"),
					output: OutputSchema,
				});
			},
		});

		return {
			data,
		};
	},
	component() {
		const { data } = Route.useLoaderData();

		return (
			<div className={"flex flex-col gap-2"}>
				{data.map((item) => {
					return (
						<QueueItem
							key={item.id}
							entity={item}
						/>
					);
				})}
			</div>
		);
	},
});
