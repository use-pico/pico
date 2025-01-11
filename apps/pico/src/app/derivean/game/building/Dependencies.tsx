import { useParams } from "@tanstack/react-router";
import { Badge, Icon, LinkTo, Tx } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import { DepGraphCycleError } from "dependency-graph";
import type { FC } from "react";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Dependencies {
	interface BuildingCount {
		buildingBaseId: string;
		count: number;
	}

	export interface Props {
		graph: withBuildingGraph.Result;
		buildingBaseId: string;
		buildingCounts: BuildingCount[];
		mode?: "dependants" | "dependencies";
	}
}

export const Dependencies: FC<Dependencies.Props> = ({
	graph,
	buildingBaseId,
	buildingCounts,
	mode = "dependencies",
}) => {
	try {
		const dependencies =
			mode === "dependants" ?
				graph.dependantsOf(buildingBaseId)
			:	graph.dependenciesOf(buildingBaseId);

		const isOk = dependencies.every((item) =>
			buildingCounts.some((dep) => item === dep.buildingBaseId),
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
					isOk ?
						<Icon
							css={{
								base: ["text-emerald-500"],
							}}
							icon={"icon-[charm--circle-tick]"}
						/>
					:	<Icon
							css={{
								base: ["text-red-500"],
							}}
							icon={"icon-[system-uicons--cross-circle]"}
						/>

				:	<Icon
						css={{
							base: ["text-amber-500"],
						}}
						icon={"icon-[fe--question]"}
					/>
				}
				{dependencies.length > 0 ?
					dependencies.map((item) => {
						const { locale } = useParams({ from: "/$locale" });
						const building = buildingCounts.find(
							(dep) => item === dep.buildingBaseId,
						);

						return (
							<LinkTo
								to={"/$locale/apps/derivean/game/building/construction/list"}
								params={{ locale }}
								search={{ filter: { buildingBaseId: item } }}
							>
								{(building?.count || 0) > 0 ?
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
								:	<Badge
										key={genId()}
										css={{
											base: [
												"bg-amber-200",
												"text-amber-700",
												"border-amber-500",
											],
										}}
									>
										{graph.getNodeData(item)}
									</Badge>
								}
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
