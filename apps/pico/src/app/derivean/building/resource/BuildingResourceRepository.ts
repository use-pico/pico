import { withRepository } from "@use-pico/client";
import { BuildingRepository } from "~/app/derivean/building/BuildingRepository";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BuildingResourceRepository = withRepository<
	Database,
	BuildingResourceSchema
>({
	name: "BuildingResourceRepository",
	schema: BuildingResourceSchema,
	meta: {
		where: {
			id: "br.id",
			idIn: "br.id",
			buildingId: "br.buildingId",
			resourceId: "br.resourceId",
			userId: "b.userId",
		},
		fulltext: ["br.id", "bb.name", "r.name"],
	},
	select({ tx }) {
		return tx
			.selectFrom("Building_Resource as br")
			.selectAll("br")
			.leftJoin("Building as b", "b.id", "br.buildingId")
			.leftJoin("BaseBuilding as bb", "bb.id", "b.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "br.resourceId");
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("Building_Resource");
		},
		update({ tx }) {
			return tx.updateTable("Building_Resource");
		},
		remove({ tx }) {
			return tx.deleteFrom("Building_Resource");
		},
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				building: await BuildingRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.buildingId } },
				}),
				resource: await ResourceRepository(tx).fetchOrThrow({
					tx,
					query: { where: { id: entity.resourceId } },
				}),
			};
		},
	},
});
