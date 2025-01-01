import { withRepository } from "@use-pico/client";
import { BuildingRepository } from "~/app/derivean/building/BuildingRepository";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { StorageSchema } from "~/app/derivean/storage/StorageSchema";

export const StorageRepository = withRepository({
	name: "StorageRepository",
	schema: StorageSchema,
	meta: {
		where: {
			id: "storage.id",
			idIn: "storage.id",
			buildingId: "storage.buildingId",
			resourceId: "storage.resourceId",
		},
		fulltext: [
			"storage.id",
			"storage.resourceId",
			"storage.userId",
			"resource.name",
			"baseBuilding.name",
		],
	},
	insert() {
		return db.kysely.insertInto("Storage");
	},
	update() {
		return db.kysely.updateTable("Storage");
	},
	remove() {
		return db.kysely.deleteFrom("Storage");
	},
	select() {
		return db.kysely
			.selectFrom("Storage as storage")
			.selectAll("storage")
			.leftJoin("Resource as resource", "resource.id", "storage.resourceId")
			.leftJoin("Building as building", "building.id", "storage.buildingId")
			.leftJoin(
				"BaseBuilding as baseBuilding",
				"baseBuilding.id",
				"building.baseBuildingId",
			);
	},
	async toOutput({ entity }) {
		return {
			...entity,
			building: await BuildingRepository.fetchOrThrow({
				query: { where: { id: entity.buildingId } },
			}),
			resource: await ResourceRepository.fetchOrThrow({
				query: { where: { id: entity.resourceId } },
			}),
		};
	},
});
