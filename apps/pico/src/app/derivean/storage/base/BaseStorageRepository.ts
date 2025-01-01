import { withRepository } from "@use-pico/client";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { BaseStorageSchema } from "~/app/derivean/storage/base/BaseStorageSchema";

export const BaseStorageRepository = withRepository({
	name: "BaseStorageRepository",
	schema: BaseStorageSchema,
	meta: {
		where: {
			id: "baseStorage.id",
			idIn: "baseStorage.id",
			baseBuildingId: "baseStorage.baseBuildingId",
			resourceId: "baseStorage.resourceId",
		},
		fulltext: [
			"storage.id",
			"storage.resourceId",
			"storage.baseBuildingId",
			"baseBuilding.name",
			"resource.name",
		],
	},
	insert() {
		return db.kysely.insertInto("BaseStorage");
	},
	update() {
		return db.kysely.updateTable("BaseStorage");
	},
	remove() {
		return db.kysely.deleteFrom("BaseStorage");
	},
	select() {
		return db.kysely
			.selectFrom("BaseStorage as baseStorage")
			.selectAll("baseStorage")
			.leftJoin("Resource as resource", "resource.id", "baseStorage.resourceId")
			.leftJoin(
				"BaseBuilding as baseBuilding",
				"baseBuilding.id",
				"baseStorage.baseBuildingId",
			);
	},
	async toOutput({ entity }) {
		return {
			...entity,
			baseBuilding: await BaseBuildingRepository.fetchOrThrow({
				query: { where: { id: entity.baseBuildingId } },
			}),
			resource: await ResourceRepository.fetchOrThrow({
				query: { where: { id: entity.resourceId } },
			}),
		};
	},
});
