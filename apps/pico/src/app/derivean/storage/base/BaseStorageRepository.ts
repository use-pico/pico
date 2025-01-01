import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { BaseStorageSchema } from "~/app/derivean/storage/base/BaseStorageSchema";

export const BaseStorageRepository = withRepository({
	name: "BaseStorageRepository",
	schema: BaseStorageSchema,
	meta: {
		where: {
			id: "bs.id",
			idIn: "bs.id",
			resourceId: "bs.resourceId",
		},
		fulltext: [
			"bs.id",
			"bs.resourceId",
			"bs.resourceId",
			"bb.id",
			"bb.name",
			"r.id",
			"r.name",
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
			.selectFrom("BaseStorage as bs")
			.selectAll("bs")
			.leftJoin("Resource as r", "r.id", "bs.resourceId");
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
