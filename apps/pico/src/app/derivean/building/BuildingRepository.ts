import { withRepository } from "@use-pico/client";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { db } from "~/app/derivean/db/db";

export const BuildingRepository = withRepository({
	name: "BuildingRepository",
	db: db.kysely,
	schema: BuildingSchema,
	meta: {
		where: {
			id: "b.id",
			idIn: "b.id",
			baseBuildingId: "b.baseBuildingId",
			userId: "b.userId",
		},
		fulltext: ["b.id", "b.baseBuildingId", "b.userId", "bb.name"],
	},
	select({ tx }) {
		return tx
			.selectFrom("Building as b")
			.selectAll("b")
			.leftJoin("BaseBuilding as bb", "bb.id", "b.baseBuildingId");
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("Building");
		},
		update({ tx }) {
			return tx.updateTable("Building");
		},
		remove({ tx }) {
			return tx.deleteFrom("Building");
		},
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				baseBuilding: await BaseBuildingRepository.fetchOrThrow({
					tx,
					query: { where: { id: entity.baseBuildingId } },
				}),
			};
		},
	},
});

export type BuildingRepository = typeof BuildingRepository;
