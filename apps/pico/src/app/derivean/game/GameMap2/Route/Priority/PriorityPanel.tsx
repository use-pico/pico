import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Route/Priority/Item";

export namespace PriorityPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Priority {
		id: string;
		name: string;
		toName: string;
		amount: number;
		priority: number;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		priority: Priority[];
	}
}

export const PriorityPanel: FC<PriorityPanel.Props> = ({
	building,
	priority,
	...props
}) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={"icon-[ph--queue-thin]"}
			textTitle={<Tx label={"Route priority (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/view"}
						params={{ locale, id: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/building/$id/route/priority"}
						params={{ locale, id: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
				</>
			}
			{...props}
		>
			{priority.length > 0 ?
				priority.map((item) => {
					return (
						<Item
							key={item.id}
							priority={item}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
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
					<Tx label={"There are no resources on the road. (label)"} />
				</div>
			}
		</Panel>
	);
};
