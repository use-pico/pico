import { withRepository } from "@use-pico/client";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { db } from "~/app/derivean/db/db";

export const BaseBuildingRepository = withRepository({
	name: "BaseBuilding",
	schema: BaseBuildingSchema,
	database: db,
	meta: {
		where: {},
		fulltext: [
			"baseBuilding.name",
			"baseBuilding.description",
			"baseBuilding.id",
		],
	},
	insert() {
		return db.kysely.insertInto("BaseBuilding");
	},
	update() {
		return db.kysely.updateTable("BaseBuilding");
	},
	remove() {
		return db.kysely.deleteFrom("BaseBuilding");
	},
	select() {
		return db.kysely.selectFrom("BaseBuilding as baseBuilding");
	},
	async toCreate({ shape }) {
		return shape;
	},
	async toPatch({ shape }) {
		return shape;
	},
});
