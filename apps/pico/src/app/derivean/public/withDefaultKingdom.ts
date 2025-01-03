import type { Transaction } from "kysely";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { withConstruct } from "~/app/derivean/building/withConstruct";
import type { Database } from "~/app/derivean/db/Database";

export namespace withDefaultKingdom {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withDefaultKingdom = async ({
	tx,
	userId,
}: withDefaultKingdom.Props) => {
	const buildings = ["Castle", "Storage"] as const;

	for await (const building of buildings) {
		await withConstruct({
			tx,
			userId,
			baseBuildingId: (
				await BaseBuildingRepository(tx).fetchOrThrow({
					tx,
					query: { where: { name: building } },
				})
			).id,
			bypass: true,
		});
	}
};
