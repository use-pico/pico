import { withRepository } from "@use-pico/client";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingRequirementRepository = withRepository({
	name: "BaseBuildingRequirementRepository",
	db: db.kysely,
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
	select({ tx }) {
		return tx
			.selectFrom("BaseBuilding_Requirement as bbr")
			.selectAll("bbr")
			.leftJoin("BaseBuilding as bb", "bb.id", "bbr.baseBuildingId")
			.leftJoin("Resource as r", "r.id", "bbr.resourceId");
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("BaseBuilding_Requirement");
		},
		update({ tx }) {
			return tx.updateTable("BaseBuilding_Requirement");
		},
		remove({ tx }) {
			return tx.deleteFrom("BaseBuilding_Requirement");
		},
	},

	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceRepository.fetchOrThrow({
					tx,
					query: {
						where: { id: entity.resourceId },
					},
				}),
			};
		},
	},
});
