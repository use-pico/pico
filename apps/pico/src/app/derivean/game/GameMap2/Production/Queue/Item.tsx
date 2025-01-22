import { useMutation } from "@tanstack/react-query";
import { Badge, Button, TrashIcon, Tx, useInvalidator } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { QueuePanel } from "~/app/derivean/game/GameMap2/Production/Queue/QueuePanel";

export namespace Item {
	export interface Props {
		queue: QueuePanel.Queue;
	}
}

export const Item: FC<Item.Props> = ({ queue }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteMutation = useMutation({
		async mutationFn({ queueId }: { queueId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.deleteFrom("Production_Queue")
					.where("id", "=", queueId)
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
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
				queue.limit > 0 ?
					undefined
				:	[
						"border-purple-400",
						"hover:border-purple-600",
						"hover:bg-purple-100",
					],
			])}
		>
			<div className={"font-bold"}>{queue.name}</div>

			<div className={"flex flex-row gap-2 items-center"}>
				<Badge css={{ base: ["bg-amber-100", "border-amber-400"] }}>
					{queue.limit > 0 ?
						toHumanNumber({ number: queue.limit })
					:	<Tx label={"Infinite queue (label)"} />}
				</Badge>
				<Badge>x{toHumanNumber({ number: queue.amount })}</Badge>
				<Button
					iconEnabled={TrashIcon}
					loading={deleteMutation.isPending}
					onClick={() => {
						deleteMutation.mutate({ queueId: queue.id });
					}}
					variant={{ variant: "danger" }}
				/>
			</div>
		</div>
	);
};
