import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withConstruction {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		currentCycle: number;
	}
}

export const withConstruction = async ({
	tx,
	userId,
	currentCycle,
}: withConstruction.Props) => {
	const constructionQueue = await tx
		.selectFrom("Building as b")
		.innerJoin("Construction as c", "c.id", "b.constructionId")
		.select(["c.id", "c.cycle", "c.to"])
		.where("b.userId", "=", userId)
		.where("c.plan", "=", false)
		.execute();

	for await (const { id, cycle, to } of constructionQueue) {
		if (currentCycle > to) {
			await tx.deleteFrom("Construction").where("id", "=", id).execute();

			continue;
		}

		await tx
			.updateTable("Construction")
			.set("cycle", cycle + 1)
			.where("id", "=", id)
			.execute();
	}
};
