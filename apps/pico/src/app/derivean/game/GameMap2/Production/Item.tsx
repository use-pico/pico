import { useParams } from "@tanstack/react-router";
import { Badge, LinkTo } from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { ProductionPanel } from "~/app/derivean/game/GameMap2/Production/ProductionPanel";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace Item {
	export interface Props {
		building: ProductionPanel.Building;
		production: ProductionPanel.Production;
	}
}

export const Item: FC<Item.Props> = ({ building, production }) => {
	const { locale } = useParams({ from: "/$locale" });

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
			])}
		>
			<LinkTo
				to={
					"/$locale/apps/derivean/map/building/$id/production/$productionId/requirements"
				}
				params={{ locale, id: building.id, productionId: production.id }}
			>
				{production.name}
				<Badge>x{toHumanNumber({ number: production.amount })}</Badge>
			</LinkTo>
			<CyclesInline cycles={production.cycles} />
		</div>
	);
};
