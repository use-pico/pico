import { Badge, Progress } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { QueuePanel } from "~/app/derivean/game/GameMap2/Production/Queue/QueuePanel";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace Item {
	export interface Props {
		queue: QueuePanel.Queue;
		inventory: QueuePanel.Inventory[];
	}
}

export const Item: FC<Item.Props> = ({ queue, inventory }) => {
	const item = inventory.find((item) => item.resourceId === queue.resourceId);
	const isFull = item && item.amount + queue.amount > item.limit;

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
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				isFull ? ["border-red-400", "hover:border-red-600"] : undefined,
			])}
		>
			<div
				className={"flex flex-row gap-2 items-center justify-between w-full"}
			>
				<div className={"font-bold"}>{queue.name}</div>

				<div className={"flex flex-row gap-2 items-center"}>
					<Badge>x{toHumanNumber({ number: queue.amount })}</Badge>
				</div>
				<CyclesInline cycles={queue.cycles} />
			</div>

			<Progress
				css={{
					progress: isFull ? ["bg-red-500"] : undefined,
				}}
				value={(100 * queue.cycle) / queue.cycles}
			/>
		</div>
	);
};
