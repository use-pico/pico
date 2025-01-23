import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Badge,
    Button,
    LinkTo,
    TrashIcon,
    useInvalidator,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { RoutePanel } from "~/app/derivean/game/GameMap2/Route/RoutePanel";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Item {
	export interface Props {
		route: RoutePanel.Route;
	}
}

export const Item: FC<Item.Props> = ({ route }) => {
	const { locale } = useParams({ from: "/$locale" });
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteRouteMutation = useMutation({
		async mutationFn({ routeId }: { routeId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx.deleteFrom("Route").where("id", "=", routeId).execute();
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
				route.count > 0 ?
					undefined
				:	[
						"border-amber-400",
						"bg-amber-50",
						"hover:bg-amber-50",
						"hover:border-amber-600",
					],
			])}
		>
			{route.toConstructionId ?
				<LinkTo
					icon={ConstructionIcon}
					to={"/$locale/apps/derivean/map/route/$id/construction"}
					params={{ locale, id: route.id }}
				>
					{route.toName}
				</LinkTo>
			:	<LinkTo
					icon={ResourceIcon}
					to={"/$locale/apps/derivean/map/route/$id/resources"}
					params={{ locale, id: route.id }}
				>
					{route.toName}
				</LinkTo>
			}

			<div className={"flex flex-row gap-2 items-center"}>
				<LinkTo
					icon={"icon-[cil--arrow-right]"}
					to={"/$locale/apps/derivean/map/building/$id/routes"}
					params={{ locale, id: route.fromId }}
					search={{ zoomToId: route.toId }}
				>
					<Badge>{toHumanNumber({ number: route.count })}</Badge>
				</LinkTo>

				<Button
					iconEnabled={TrashIcon}
					variant={{ variant: "secondary" }}
					loading={deleteRouteMutation.isPending}
					onClick={() => {
						deleteRouteMutation.mutate({ routeId: route.id });
					}}
				/>
			</div>
		</div>
	);
};
