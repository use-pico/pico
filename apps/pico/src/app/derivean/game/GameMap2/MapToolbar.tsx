import { useParams } from "@tanstack/react-router";
import { BackIcon, Button, LinkTo } from "@use-pico/client";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { LandIcon } from "~/app/derivean/icon/LandIcon";

export namespace MapToolbar {
	export interface Props {
		//
	}
}

export const MapToolbar: FC<MapToolbar.Props> = () => {
	const { locale, mapId } = useParams({
		from: "/$locale/apps/derivean/map/$mapId",
	});

	return (
		<div
			className={
				"react-flow__panel flex flex-row p-2 border bg-white border-slate-300 shadow-xs"
			}
		>
			<LinkTo
				to={"/$locale/apps/derivean/game"}
				params={{ locale }}
			>
				<Button
					iconEnabled={BackIcon}
					variant={{ variant: "subtle" }}
				/>
			</LinkTo>
			<LinkTo
				to={"/$locale/apps/derivean/map/$mapId/building/list"}
				params={{ locale, mapId }}
			>
				<Button
					iconEnabled={BuildingIcon}
					variant={{ variant: "subtle" }}
				/>
			</LinkTo>
			<LinkTo
				to={"/$locale/apps/derivean/map/$mapId/land/list"}
				params={{ locale, mapId }}
			>
				<Button
					iconEnabled={LandIcon}
					variant={{ variant: "subtle" }}
				/>
			</LinkTo>
		</div>
	);
};
