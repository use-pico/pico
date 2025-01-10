import { useParams } from "@tanstack/react-router";
import { Badge, Icon, LinkTo, Tx } from "@use-pico/client";
import { genId, tvc } from "@use-pico/common";
import { DepGraphCycleError } from "dependency-graph";
import type { FC } from "react";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Dependencies {
	export interface Props {
		graph: withBuildingGraph.Result;
		buildingBaseId: string;
		mode?: "dependants" | "dependencies";
	}
}

export const Dependencies: FC<Dependencies.Props> = ({
	graph,
	buildingBaseId,
	mode = "dependencies",
}) => {
	const { locale } = useParams({ from: "/$locale" });

	try {
		const dependencies =
			mode === "dependants" ?
				graph.dependantsOf(buildingBaseId)
			:	graph.dependenciesOf(buildingBaseId);

		return (
			<div className={tvc(["flex", "flex-row", "gap-2", "items-center"])}>
				{dependencies.length > 0 ?
					<Icon
						css={{
							base: ["text-emerald-500"],
						}}
						icon={"icon-[charm--circle-tick]"}
					/>
				:	<Icon
						css={{
							base: ["text-amber-500"],
						}}
						icon={"icon-[fe--question]"}
					/>
				}
				{dependencies.length > 0 ?
					dependencies.map((item) => (
						<LinkTo
							key={genId()}
							to={
								"/$locale/apps/derivean/root/building/base/$id/required/buildings"
							}
							params={{ locale, id: item }}
						>
							<Badge
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
						</LinkTo>
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
						<LinkTo
							key={genId()}
							to={
								"/$locale/apps/derivean/root/building/base/$id/required/buildings"
							}
							params={{ locale, id: item }}
						>
							<Badge
								css={{
									base: ["bg-red-200", "text-red-700", "border-red-500"],
								}}
							>
								{graph.getNodeData(item)}
							</Badge>
						</LinkTo>
					))}
				</div>
			);
		}
		return "kaboom";
	}
};
