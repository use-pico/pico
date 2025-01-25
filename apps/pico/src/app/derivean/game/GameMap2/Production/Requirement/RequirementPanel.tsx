import { useParams } from "@tanstack/react-router";
import { BackIcon, LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Production/Requirement/Item";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace RequirementPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Production {
		id: string;
		name: string;
	}

	export interface Requirement {
		id: string;
		name: string;
		amount: number;
		available?: number | null;
		passive: boolean;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		production: Production;
		requirement: Requirement[];
	}
}

export const RequirementPanel: FC<RequirementPanel.Props> = ({
	building,
	production,
	requirement,
	...props
}) => {
	const { mapId, locale } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={ResourceIcon}
			textTitle={<Tx label={"Production requirements (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={
							"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list"
						}
						params={{ locale, mapId, buildingId: building.id }}
					/>
					<LinkTo
						to={
							"/$locale/apps/derivean/map/$mapId/building/$buildingId/production/list"
						}
						params={{ locale, mapId, buildingId: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
					<div>{production.name}</div>
				</>
			}
			{...props}
		>
			{requirement.length > 0 ?
				requirement.map((item) => {
					return (
						<Item
							key={item.id}
							requirement={item}
						/>
					);
				})
			:	<div
					className={tvc([
						"flex",
						"items-center",
						"justify-center",
						"rounded-sm",
						"border",
						"border-green-400",
						"p-4",
						"bg-green-200",
						"font-bold",
					])}
				>
					<Tx label={"There are no requirements. (label)"} />
				</div>
			}
		</Panel>
	);
};
