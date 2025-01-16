import type { WithTransaction } from "~/app/derivean/db/WithTransaction";
import { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export namespace withBlueprintSort {
	export interface Props {
		tx: WithTransaction;
	}
}

export const withBlueprintSort = async ({ tx }: withBlueprintSort.Props) => {
	const dependencies = withBlueprintGraph({ tx });

	const blueprints = await tx
		.selectFrom("Blueprint as bl")
		.select(["bl.id"])
		.execute();

	for await (const blueprint of blueprints) {
		const deps = (await dependencies).dependenciesOf(blueprint.id);

		await tx
			.updateTable("Blueprint")
			.set({
				sort: deps.length,
			})
			.where("id", "=", blueprint.id)
			.execute();
	}
};
