import { DepGraph } from "dependency-graph";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingGraph {
	export type Result = DepGraph<string>;

	export interface Props {
		tx: WithTransaction;
	}
}

export const withBuildingGraph = async ({
	tx,
}: withBuildingGraph.Props): Promise<withBuildingGraph.Result> => {
	const graph = new DepGraph<string>({ circular: false });

	for await (const { id, name } of await tx
		.selectFrom("Building_Base")
		.select(["id", "name"])
		.execute()) {
		graph.addNode(id, name);
	}

	for await (const { buildingBaseId, requirementId } of await tx
		.selectFrom("Building_Base_Building_Base_Requirement")
		.select(["buildingBaseId", "requirementId"])
		.execute()) {
		graph.addDependency(requirementId, buildingBaseId);
	}

	return graph;
};
