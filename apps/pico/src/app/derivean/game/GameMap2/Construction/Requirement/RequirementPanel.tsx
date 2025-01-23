import { Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Construction/Requirement/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { RequirementIcon } from "~/app/derivean/icon/RequirementIcon";

export namespace RequirementPanel {
	export interface Requirement {
		id: string;
		name: string;
		amount: number;
		available?: number | null;
		passive: boolean;
	}

	export interface Props extends Panel.PropsEx {
		requirement: Requirement[];
	}
}

export const RequirementPanel: FC<RequirementPanel.Props> = ({
	requirement,
	...props
}) => {
	return (
		<Panel
			icon={RequirementIcon}
			textTitle={<Tx label={"Construction requirements (label)"} />}
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
					<Tx label={"There are no construction requirements (label)"} />
				</div>
			}
		</Panel>
	);
};
