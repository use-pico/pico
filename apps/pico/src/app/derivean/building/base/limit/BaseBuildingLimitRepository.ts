import { withRepository } from "@use-pico/client";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingLimitRepository = withRepository({
	name: "BaseBuildingLimitRepository",
	db: db.kysely,
	schema: BaseBuildingLimitSchema,
	meta: {
		where: {
			id: "bbl.id",
			idIn: "bbl.id",
			resourceId: "bbl.resourceId",
			baseBuildingId: "bbl.baseBuildingId",
		},
		fulltext: ["bbl.id", "bbl.resourceId", "r.id", "r.name"],
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("BaseBuilding_Limit");
		},
		update({ tx }) {
			return tx.updateTable("BaseBuilding_Limit");
		},
		remove({ tx }) {
			return tx.deleteFrom("BaseBuilding_Limit");
		},
	},
	select({ tx }) {
		return tx
			.selectFrom("BaseBuilding_Limit as bbl")
			.selectAll("bbl")
			.leftJoin("Resource as r", "r.id", "bbl.resourceId");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceRepository.fetchOrThrow({
					tx,
					query: { where: { id: entity.resourceId } },
				}),
			};
		},
	},
});
