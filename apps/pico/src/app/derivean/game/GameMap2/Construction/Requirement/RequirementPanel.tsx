import { useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Construction/Requirement/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";

export namespace RequirementPanel {
	export interface Building {
		id: string;
		name: string;
	}

	export interface Supply {
		id: string;
		buildingId: string;
		name: string;
	}

	export interface Supplier {
		id: string;
		name: string;
	}

	export interface Requirement {
		id: string;
		name: string;
		amount: number;
		transport: number;
		supply?: Supply | null;
		supplier?: Supplier | null;
		available?: number | null;
		passive: boolean;
	}

	export interface Props extends Panel.PropsEx {
		building: Building;
		requirement: Requirement[];
	}
}

export const RequirementPanel: FC<RequirementPanel.Props> = ({
	building,
	requirement,
	...props
}) => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<Panel
			icon={RequirementIcon}
			textTitle={<Tx label={"Construction requirements (label)"} />}
			textSubTitle={
				<LinkTo
					to={"/$locale/apps/derivean/map/$mapId/building/$buildingId/view"}
					params={{ locale, mapId, buildingId: building.id }}
					search={{ zoomToId: building.id }}
				>
					{building.name}
				</LinkTo>
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
					<Tx label={"There are no construction requirements (label)"} />
				</div>
			}
		</Panel>
	);
};
