import { Badge, Icon, Tx } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import { DepGraphCycleError } from "dependency-graph";
import type { FC } from "react";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export namespace Dependencies {
	export interface Props {
		graph: withBlueprintGraph.Result;
		blueprintId: string;
		mode?: "dependants" | "dependencies";
		reverse?: boolean;
	}
}

export const Dependencies: FC<Dependencies.Props> = ({
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

		return (
			<div
				className={tvc([
					"flex",
					"flex-row",
					"flex-wrap",
					"gap-2",
					"items-center",
				])}
			>
				{dependencies.length > 0 ?
					dependencies.map((item) => (
						<Badge
							key={genId()}
							css={{
								base: [
									"bg-emerald-200",
									"text-emerald-700",
									"border-emerald-500",
								],
							}}
						>
							{graph.getNodeData(item)}
						</Badge>
					))
				:	<Tx
						css={{
							base: ["text-amber-500", "font-bold"],
						}}
						label={"No dependents (label)"}
					/>
				}
			</div>
		);
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
