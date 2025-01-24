import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Badge, Button, LinkTo, useInvalidator } from "@use-pico/client";
import { type FC } from "react";
import type { ConstructionPanel } from "~/app/derivean/game/GameMap2/Construction/ConstructionPanel";
import { ItemCss } from "~/app/derivean/game/GameMap2/Construction/ItemCss";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";
import { CyclesInline } from "~/app/derivean/ui/CyclesInline";

export namespace Item {
	export interface Props extends ItemCss.Props {
		blueprint: ConstructionPanel.Blueprint;
		land: ConstructionPanel.Land;
		userId: string;
	}
}

export const Item: FC<Item.Props> = ({
	blueprint,
	land,
	userId,
	variant,
	tva = ItemCss,
	css,
}) => {
	const { locale } = useParams({ from: "/$locale" });
	const navigate = useNavigate();
	const invalidator = useInvalidator([["GameMap"]]);

	const constructionMutation = useMutation({
		async mutationFn({
			blueprintId,
			landId,
		}: {
			blueprintId: string;
			landId: string;
		}) {
			const building = await withConstructionQueue({
				userId,
				blueprintId,
				landId,
				x: 0,
				y: 0,
				plan: true,
				valid: false,
			});

			navigate({
				to: "/$locale/apps/derivean/map/$id/land/$landId/construction",
				params: { locale, id: land.mapId, landId: land.id },
				search: { zoomToId: building.id },
			});
		},
		async onSuccess() {
			await invalidator();
		},
		onError(error) {
			console.error(error);
		},
	});
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			<div className={"flex flex-row gap-2 items-center justify-between"}>
				<div className={"flex flex-row gap-2"}>
					<Badge>x{blueprint.count}</Badge>
					<LinkTo
						to={
							"/$locale/apps/derivean/map/$id/blueprint/$blueprintId/requirements"
						}
						params={{ locale, id: land.mapId, blueprintId: blueprint.id }}
						css={{ base: ["font-bold"] }}
					>
						{blueprint.name}
					</LinkTo>
				</div>
				<div className={"flex flex-row gap-2"}>
					<CyclesInline cycles={blueprint.cycles} />
					<Button
						iconEnabled={ConstructionIcon}
						iconDisabled={ConstructionIcon}
						loading={constructionMutation.isPending}
						onClick={() => {
							constructionMutation.mutate({
								blueprintId: blueprint.id,
								landId: land.id,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
};
