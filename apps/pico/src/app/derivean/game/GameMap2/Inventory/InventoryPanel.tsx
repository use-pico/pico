import { Fulltext, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { Item } from "~/app/derivean/game/GameMap2/Inventory/Item";
import { Panel } from "~/app/derivean/game/GameMap2/Panel";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";

export namespace InventoryPanel {
	export interface Inventory {
		id: string;
		name: string;
		limit: number;
		amount: number;
	}

	export interface Props extends Panel.PropsEx {
		inventory: {
			input: Inventory[];
			output: Inventory[];
			storage: Inventory[];
		};
		fulltextProps: Fulltext.Props;
	}
}

export const InventoryPanel: FC<InventoryPanel.Props> = ({
	inventory,
	fulltextProps,
	...props
}) => {
	return (
		<Panel
			icon={InventoryIcon}
			textTitle={<Tx label={"Inventory (label)"} />}
			{...props}
		>
			<Fulltext {...fulltextProps} />

			<div>
				<Tx
					label={"Inventory - storage (label)"}
					css={{ base: ["font-bold", "text-slate-500"] }}
				/>
			</div>
			{inventory.storage.length > 0 ?
				inventory.storage.map((item) => {
					return (
						<Item
							key={item.id}
							inventory={item}
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
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"No inventory storage. (label)"} />
				</div>
			}

			<div className={"border-b border-slate-300"} />

			<div>
				<Tx
					label={"Inventory - inputs (label)"}
					css={{ base: ["font-bold", "text-slate-500"] }}
				/>
			</div>
			{inventory.input.length > 0 ?
				inventory.input.map((item) => {
					return (
						<Item
							key={item.id}
							inventory={item}
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
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"No inventory inputs. (label)"} />
				</div>
			}

			<div className={"border-b border-slate-300"} />

			<div>
				<Tx
					label={"Inventory - outputs (label)"}
					css={{ base: ["font-bold", "text-slate-500"] }}
				/>
			</div>
			{inventory.output.length > 0 ?
				inventory.output.map((item) => {
					return (
						<Item
							key={item.id}
							inventory={item}
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
						"border-amber-400",
						"p-4",
						"bg-amber-200",
						"font-bold",
					])}
				>
					<Tx label={"No inventory outputs. (label)"} />
				</div>
			}
		</Panel>
	);
};
