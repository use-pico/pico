import { withRepository } from "@use-pico/client";
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
			resourceId: "storage.resourceId",
			userId: "storage.userId",
		},
		fulltext: [
			"storage.id",
			"storage.resourceId",
			"storage.userId",
			"resource.name",
			"user.name",
			"user.login",
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
			.leftJoin("User as user", "user.id", "storage.userId");
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
