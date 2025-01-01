import { withRepository } from "@use-pico/client";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { db } from "~/app/derivean/db/db";

export const BuildingRepository = withRepository({
	name: "BuildingRepository",
	schema: BuildingSchema,
	meta: {
		where: {
			id: "building.id",
			idIn: "building.id",
			baseBuildingId: "building.baseBuildingId",
			userId: "building.userId",
		},
		fulltext: [
			"building.id",
			"building.baseBuildingId",
			"building.userId",
			"baseBuilding.name",
		],
	},
	insert() {
		return db.kysely.insertInto("Building");
	},
	update() {
		return db.kysely.updateTable("Building");
	},
	remove() {
		return db.kysely.deleteFrom("Building");
	},
	select() {
		return db.kysely
			.selectFrom("Building as building")
			.selectAll("building")
			.leftJoin(
				"BaseBuilding as baseBuilding",
				"baseBuilding.id",
				"building.baseBuildingId",
			);
	},
	async toOutput({ entity }) {
		return {
			...entity,
			baseBuilding: await BaseBuildingRepository.fetchOrThrow({
				query: { where: { id: entity.baseBuildingId } },
			}),
		};
	},
});
