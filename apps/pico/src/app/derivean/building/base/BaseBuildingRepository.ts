import { withRepository } from "@use-pico/client";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingLimitRepository } from "~/app/derivean/building/base/limit/BaseBuildingLimitRepository";
import { BaseBuildingRequirementRepository } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementRepository";
import { db } from "~/app/derivean/db/db";

export const BaseBuildingRepository = withRepository({
	name: "BaseBuilding",
	db: db.kysely,
	schema: BaseBuildingSchema,
	meta: {
		where: {
			id: "bb.id",
			idIn: "bb.id",
			name: "bb.name",
		},
		fulltext: ["bb.name", "bb.description", "bb.id"],
	},
	select({ tx }) {
		return tx.selectFrom("BaseBuilding as bb").selectAll("bb");
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("BaseBuilding");
		},
		update({ tx }) {
			return tx.updateTable("BaseBuilding");
		},
		remove({ tx }) {
			return tx.deleteFrom("BaseBuilding");
		},
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				requirements: await BaseBuildingRequirementRepository.list({
					tx,
					query: {
						where: {
							baseBuildingId: entity.id,
						},
					},
				}),
				limits: await BaseBuildingLimitRepository.list({
					tx,
					query: {
						where: {
							baseBuildingId: entity.id,
						},
					},
				}),
			};
		},
	},
});
