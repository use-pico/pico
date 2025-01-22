import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Badge, Button, useInvalidator } from "@use-pico/client";
import { type Entity } from "@use-pico/common";
import { type FC } from "react";
import type { ConstructionPanel } from "~/app/derivean/game/GameMap2/Construction/ConstructionPanel";
import { ItemCss } from "~/app/derivean/game/GameMap2/Construction/ItemCss";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";

export namespace Item {
	export interface Props
		extends ItemCss.Props<Entity.Type<ConstructionPanel.Blueprint>> {
		userId: string;
	}
}

export const Item: FC<Item.Props> = ({
	userId,
	entity,
	variant,
	tva = ItemCss,
	css,
}) => {
	const { locale } = useParams({ from: "/$locale" });
	const navigate = useNavigate();
	const invalidator = useInvalidator([["GameMap"]]);

	const constructionMutation = useMutation({
		async mutationFn({ blueprintId }: { blueprintId: string }) {
			const construction = await withConstructionQueue({
				userId,
				blueprintId,
				x: 0,
				y: 0,
				plan: true,
				valid: false,
			});

			navigate({
				to: "/$locale/apps/derivean/map/construction",
				params: { locale },
				search: { zoomToId: construction.id },
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
					<Badge>x{entity.count}</Badge>
					<div className={"font-bold"}>{entity.name}</div>
				</div>
				<div className={"flex flex-row gap-2"}>
					<Button
						iconEnabled={ConstructionIcon}
						iconDisabled={ConstructionIcon}
						loading={constructionMutation.isPending}
						onClick={() => {
							constructionMutation.mutate({ blueprintId: entity.id });
						}}
					/>
				</div>
			</div>
		</div>
	);
};
