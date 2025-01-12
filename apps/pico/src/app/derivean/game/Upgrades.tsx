import { Badge, Icon } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import { DepGraphCycleError } from "dependency-graph";
import type { FC } from "react";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export namespace Upgrades {
	export interface Props {
		graph: withBlueprintUpgradeGraph.Result;
		blueprintId: string;
		mode?: "dependants" | "dependencies";
		reverse?: boolean;
	}
}

export const Upgrades: FC<Upgrades.Props> = ({
	graph,
	blueprintId,
	mode = "dependencies",
	reverse = false,
}) => {
	try {
		const dependencies = ((list) => {
			if (reverse) {
				return list.reverse();
			}
			return list;
		})(
			mode === "dependants" ?
				graph.dependantsOf(blueprintId)
			:	graph.dependenciesOf(blueprintId),
		);

		return dependencies.length > 0 ?
				<div
					className={tvc([
						"flex",
						"flex-row",
						"flex-wrap",
						"gap-2",
						"items-center",
					])}
				>
					<Icon
						css={{
							base: ["text-purple-400"],
						}}
						icon={"icon-[grommet-icons--upgrade]"}
					/>
					{dependencies.map((item) => (
						<Badge
							key={genId()}
							css={{
								base: ["bg-purple-200", "text-purple-700", "border-purple-500"],
							}}
						>
							{graph.getNodeData(item)}
						</Badge>
					))}
				</div>
			:	null;
	} catch (e) {
		if (e instanceof DepGraphCycleError) {
			return (
				<div className={tvc(["flex", "flex-row", "gap-2", "items-center"])}>
					<Icon
						css={{ base: ["text-red-500"] }}
						icon={"icon-[charm--circle-cross]"}
					/>
					{e.cyclePath.map((item) => (
						<Badge
							key={genId()}
							css={{
								base: ["bg-red-200", "text-red-700", "border-red-500"],
							}}
						>
							{graph.getNodeData(item)}
						</Badge>
					))}
				</div>
			);
		}
		return "kaboom";
	}
};
