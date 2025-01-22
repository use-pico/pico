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

	export interface Requirement {
		id: string;
		name: string;
		amount: number;
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
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Panel
			icon={ResourceIcon}
			textTitle={<Tx label={"Production requirements (label)"} />}
			textSubTitle={
				<>
					<LinkTo
						icon={BackIcon}
						to={"/$locale/apps/derivean/map/building/$id/production/list"}
						params={{ locale, id: building.id }}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/map/building/$id/production/list"}
						params={{ locale, id: building.id }}
						search={{ zoomToId: building.id }}
					>
						{building.name}
					</LinkTo>
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
						"rounded",
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
