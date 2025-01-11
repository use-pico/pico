import { DepGraph } from "dependency-graph";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withBuildingGraph {
	export type Result = DepGraph<string>;
}

export const withBuildingGraph =
	async (): Promise<withBuildingGraph.Result> => {
		const graph = new DepGraph<string>({ circular: false });

		for await (const { id, name } of await kysely
			.selectFrom("Building_Base")
			.select(["id", "name"])
			.execute()) {
			graph.addNode(id, name);
		}

		for await (const { buildingBaseId, requirementId } of await kysely
			.selectFrom("Building_Base_Building_Base_Requirement")
			.select(["buildingBaseId", "requirementId"])
			.execute()) {
			graph.addDependency(requirementId, buildingBaseId);
		}

		return graph;
	};
