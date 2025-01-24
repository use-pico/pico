import { Tx } from "@use-pico/client";
import type { FC } from "react";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { LandIcon } from "~/app/derivean/icon/LandIcon";

export namespace LandPanel {
	export interface Land {
		//
	}

	export interface Props extends Panel.PropsEx {
		land: Land[];
	}
}

export const LandPanel: FC<LandPanel.Props> = ({ land, ...props }) => {
	return (
		<Panel
			icon={LandIcon}
			textTitle={<Tx label={"Land list (label)"} />}
			{...props}
		>
			lands
		</Panel>
	);
};
