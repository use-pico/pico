import { withRepository } from "@use-pico/client";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";

export const BaseBuildingLimitRepository = withRepository({
	name: "BaseBuildingLimitRepository",
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
	insert() {
		return db.kysely.insertInto("BaseBuilding_Limit");
	},
	update() {
		return db.kysely.updateTable("BaseBuilding_Limit");
	},
	remove() {
		return db.kysely.deleteFrom("BaseBuilding_Limit");
	},
	select() {
		return db.kysely
			.selectFrom("BaseBuilding_Limit as bbl")
			.selectAll("bbl")
			.leftJoin("Resource as r", "r.id", "bbl.resourceId");
	},
	async toOutput({ entity }) {
		return {
			...entity,
			resource: await ResourceRepository.fetchOrThrow({
				query: { where: { id: entity.resourceId } },
			}),
		};
	},
});
