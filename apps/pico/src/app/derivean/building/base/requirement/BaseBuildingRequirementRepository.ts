import { withRepository } from "@use-pico/client";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingRequirementRepository = withRepository({
	name: "BaseBuildingRequirementRepository",
	schema: BaseBuildingRequirementSchema,
	meta: {
		where: {
			id: "bbr.id",
			idIn: "bbr.id",
			baseBuildingId: "bbr.baseBuildingId",
			resourceId: "bbr.resourceId",
			passive: "bbr.passive",
		},
		fulltext: [
			"bbr.id",
			"bbr.baseBuildingId",
			"bbr.resourceId",
			"bbr.name",
			"bbr.name",
		],
	},
	insert() {
		return db.kysely.insertInto("BaseBuilding_Requirement");
	},
	update() {
		return db.kysely.updateTable("BaseBuilding_Requirement");
	},
	remove() {
		return db.kysely.deleteFrom("BaseBuilding_Requirement");
	},
	select() {
		return db.kysely
			.selectFrom("BaseBuilding_Requirement as bbr")
			.selectAll("bbr")
			.leftJoin("BaseBuilding as bb", "bb.id", "bbr.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bbr.resourceId");
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
