import { withRepository } from "@use-pico/client";
import { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import { db } from "~/app/derivean/db/db";

export const BuildingRequirementResourceRepository = withRepository({
	name: "BuildingRequirementResourceRepository",
	schema: BuildingRequirementResourceSchema,
	database: db,
	meta: {
		where: {
			baseBuildingId: "buildingRequirementResource.baseBuildingId",
			resourceId: "buildingRequirementResource.resourceId",
		},
		fulltext: [
			"buildingRequirementResource.id",
			"buildingRequirementResource.baseBuildingId",
			"buildingRequirementResource.resourceId",
			"baseBuilding.name",
			"resource.name",
		],
	},
	insert() {
		return db.kysely.insertInto("BuildingRequirementResource");
	},
	update() {
		return db.kysely.updateTable("BuildingRequirementResource");
	},
	remove() {
		return db.kysely.deleteFrom("BuildingRequirementResource");
	},
	select() {
		return db.kysely
			.selectFrom("BuildingRequirementResource as buildingRequirementResource")
			.leftJoin(
				"BaseBuilding as baseBuilding",
				"baseBuilding.id",
				"buildingRequirementResource.baseBuildingId",
			)
			.leftJoin(
				"Resource as resource",
				"resource.id",
				"buildingRequirementResource.resourceId",
			);
	},
	async toCreate({ shape }) {
		return shape;
	},
	async toPatch({ shape }) {
		return shape;
	},
});
