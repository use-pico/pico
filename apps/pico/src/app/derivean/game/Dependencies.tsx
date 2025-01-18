import { useParams } from "@tanstack/react-router";
import { Badge, Icon, LinkTo, Tx } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import { DepGraphCycleError } from "dependency-graph";
import type { FC } from "react";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export namespace Dependencies {
	interface BuildingCount {
		blueprintId: string;
		count: number;
	}

	export interface Props {
		graph: withBlueprintGraph.Result;
		blueprintId: string;
		buildingCounts: BuildingCount[];
		mode?: "dependants" | "dependencies";
		reverse?: boolean;
	}
}

export const Dependencies: FC<Dependencies.Props> = ({
	graph,
	blueprintId,
	buildingCounts,
	mode = "dependencies",
	reverse = false,
}) => {
	const { locale } = useParams({ from: "/$locale" });
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
					{dependencies.length > 0 ?
						dependencies.map((item) => {
							const count = buildingCounts.find(
								(count) => count.blueprintId === item,
							)?.count;

							return (
								<LinkTo
									key={genId()}
									to={"/$locale/apps/derivean/game/map"}
									params={{ locale }}
									search={{ blueprintId: item }}
								>
									<Badge
										css={{
											base:
												count && count > 0 ?
													[
														"bg-emerald-200",
														"text-emerald-700",
														"border-emerald-500",
													]
												:	["bg-slate-100", "text-slate-500", "border-slate-300"],
										}}
									>
										{graph.getNodeData(item)}
									</Badge>
								</LinkTo>
							);
						})
					:	<Tx
							css={{
								base: ["text-amber-500", "font-bold"],
							}}
							label={"No dependents (label)"}
						/>
					}
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
