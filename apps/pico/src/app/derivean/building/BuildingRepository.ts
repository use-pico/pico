import { withRepository } from "@use-pico/client";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { db } from "~/app/derivean/db/db";

export const BuildingRepository = withRepository({
	name: "BuildingRepository",
	schema: BuildingSchema,
	database: db,
	meta: {
		where: {
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
			.leftJoin(
				"BaseBuilding as baseBuilding",
				"baseBuilding.id",
				"building.baseBuildingId",
			);
	},
	async toCreate({ shape }) {
		return shape;
	},
	async toPatch({ shape }) {
		return shape;
	},
});
