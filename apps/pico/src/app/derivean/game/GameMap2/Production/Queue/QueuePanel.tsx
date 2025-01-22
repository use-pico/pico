import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Production/Queue/Item";
import { QueueIcon } from "~/app/derivean/icon/QueueIcon";

export namespace QueuePanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Queue {
		id: string;
		name: string;
		amount: number;
		limit: number;
		cycles: number;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		queue: Queue[];
	}
}

export const QueuePanel: FC<QueuePanel.Props> = ({
	building,
	queue,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={QueueIcon}
			textTitle={<Tx label={"Production queue (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/view"}
						params={{ locale, id: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/building/$id/view"}
						params={{ locale, id: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{queue.length > 0 ?
				queue.map((item) => {
					return (
						<Item
							key={item.id}
							queue={item}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
						"flex-col",
						"items-center",
						"justify-center",
						"rounded",
						"border",
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"Production queue is empty. (label)"} />
					<LinkTo
						icon={QueueIcon}
						to={"/$locale/apps/derivean/map/building/$id/production/list"}
						params={{ locale, id: building.id }}
					>
						<Tx label={"Plan queue (label)"} />
					</LinkTo>
				</div>
			}
		</Panel>
	);
};
