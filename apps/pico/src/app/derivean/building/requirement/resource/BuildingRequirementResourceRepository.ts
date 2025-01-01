import { withRepository } from "@use-pico/client";
import { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BuildingRequirementResourceRepository = withRepository({
	name: "BuildingRequirementResourceRepository",
	schema: BuildingRequirementResourceSchema,
	meta: {
		where: {
			id: "buildingRequirementResource.id",
			idIn: "buildingRequirementResource.id",
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
		return db.kysely.insertInto("BaseBuilding_ResourceRequirement");
	},
	update() {
		return db.kysely.updateTable("BaseBuilding_ResourceRequirement");
	},
	remove() {
		return db.kysely.deleteFrom("BaseBuilding_ResourceRequirement");
	},
	select() {
		return db.kysely
			.selectFrom("BaseBuilding_ResourceRequirement as bbrr")
			.selectAll("bbrr")
			.leftJoin(
				"BaseBuilding as bb",
				"bb.id",
				"bbrr.baseBuildingId",
			)
			.leftJoin("Resource as r", "r.id", "bbrr.resourceId");
	},
	async toOutput({ entity }) {
		return {
			...entity,
			resource: await ResourceRepository.fetchOrThrow({
				query: {
					where: { id: entity.resourceId },
				},
			}),
		};
	},
});
