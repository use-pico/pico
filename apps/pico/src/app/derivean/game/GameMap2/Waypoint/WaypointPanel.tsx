import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    LinkTo,
    TrashIcon,
    Tx,
    useInvalidator,
} from "@use-pico/client";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { LinkCss } from "~/app/derivean/game/GameMap2/LinkCss";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { TransportIcon } from "~/app/derivean/icon/TransportIcon";
import { WaypointIcon } from "~/app/derivean/icon/WaypointIcon";
import { withBuildingRouteBuilding } from "~/app/derivean/service/withBuildingRouteBuilding";

export namespace WaypointPanel {
	export interface Waypoint {
		id: string;
	}

	export interface Props {
		userId: string;
		waypoint: Waypoint;
	}
}

export const WaypointPanel: FC<WaypointPanel.Props> = ({
	userId,
	waypoint,
}) => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteWaypointMutation = useMutation({
		async mutationFn({
			id,
			userId,
			mapId,
		}: {
			id: string;
			userId: string;
			mapId: string;
		}) {
			return kysely.transaction().execute(async (tx) => {
				await tx.deleteFrom("Waypoint").where("id", "=", id).execute();

				setTimeout(async () => {
					await withBuildingRouteBuilding({
						tx,
						mapId,
						userId,
					});
					await invalidator();
				}, 0);
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<Panel
			icon={WaypointIcon}
			textTitle={<Tx label={"Waypoint (label)"} />}
		>
			<LinkTo
				icon={TransportIcon}
				to={"/$locale/apps/derivean/map/$mapId/waypoint/$waypointId/transport"}
				params={{ locale, mapId, waypointId: waypoint.id }}
				css={{ base: LinkCss }}
			>
				<Tx label={"Waypoint transports (label)"} />
			</LinkTo>

			<div className={"border-b border-slate-300"} />

			<Button
				iconEnabled={TrashIcon}
				variant={{ variant: "danger" }}
				loading={deleteWaypointMutation.isPending}
				onClick={() => {
					deleteWaypointMutation.mutate({ id: waypoint.id, mapId, userId });
				}}
				css={{
					base: ["w-full"],
				}}
			>
				<Tx label={"Delete waypoint (label)"} />
			</Button>
		</Panel>
	);
};
