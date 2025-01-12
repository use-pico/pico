import { DepGraph } from "dependency-graph";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBlueprintUpgradeGraph {
	export type Result = DepGraph<string>;

	export interface Props {
		tx: WithTransaction;
	}
}

export const withBlueprintUpgradeGraph = async ({
	tx,
}: withBlueprintUpgradeGraph.Props): Promise<withBlueprintUpgradeGraph.Result> => {
	const graph = new DepGraph<string>({ circular: false });

	const blueprints = await tx
		.selectFrom("Blueprint as bl")
		.select(["bl.id", "bl.name"])
		.execute();

	for await (const { id, name } of blueprints) {
		graph.addNode(id, name);
	}

	const upgrades = await tx
		.selectFrom("Blueprint as bl")
		.innerJoin("Blueprint as up", "up.id", "bl.upgradeId")
		.select(["bl.id", "bl.upgradeId"])
		.execute();

	for await (const { id, upgradeId } of upgrades) {
		upgradeId && graph.addDependency(id, upgradeId);
	}

	return graph;
};
