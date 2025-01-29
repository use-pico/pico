import { Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { Item } from "~/app/derivean/game/GameMap2/Waypoint/Transport/Item";
import { TransportIcon } from "~/app/derivean/icon/TransportIcon";

export namespace TransportPanel {
	export interface Transport {
		id: string;
		name: string;
		amount: number;
	}

	export interface Props extends Panel.PropsEx {
		transport: Transport[];
	}
}

export const TransportPanel: FC<TransportPanel.Props> = ({
	transport,
	...props
}) => {
	return (
		<Panel
			icon={TransportIcon}
			textTitle={<Tx label={"Transport (label)"} />}
			{...props}
		>
			{transport.length > 0 ?
				transport.map((transport) => {
					return (
						<Item
							key={transport.id}
							transport={transport}
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
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx
						label={
							"There are no resources transported on this waypoint. (label)"
						}
					/>
				</div>
			}
		</Panel>
	);
};
