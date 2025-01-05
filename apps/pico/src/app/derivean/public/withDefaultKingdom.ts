import type { Transaction } from "kysely";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { withConstruct } from "~/app/derivean/building/withConstruct";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

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
				await BaseBuildingSource.fetchOrThrow$({
					tx,
					where: { name: building },
				})
			).id,
			bypass: true,
		});
	}

	const storageId = (
		await BuildingSource.fetchOrThrow$({
			tx,
			where: { userId, name: "Storage" },
		})
	).id;

	const resources = [
		{
			resource: "Wood",
			amount: 25,
		},
		{
			resource: "Stone",
			amount: 10,
		},
	] as const;

	for await (const resource of resources) {
		const shape = {
			resourceId: (
				await ResourceSource.fetchOrThrow$({
					tx,
					where: { name: resource.resource },
				})
			).id,
			amount: resource.amount,
		};

		await BuildingResourceSource.create$({
			tx,
			shape,
			entity: {
				...shape,
				buildingId: storageId,
			},
		});
	}
};
