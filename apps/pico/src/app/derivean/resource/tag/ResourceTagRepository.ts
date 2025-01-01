import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";

export const ResourceTagRepository = withRepository({
	name: "ResourceTagRepository",
	schema: ResourceTagSchema,
	meta: {
		where: {
			id: "rt.id",
			idIn: "rt.id",
			resourceId: "rt.resourceId",
			tagId: "rt.tagId",
		},
		fulltext: [
			"r.id",
			"r.name",
			"rt.id",
			"t.code",
			"t.group",
			"t.id",
			"t.label",
		],
	},
	insert() {
		return db.kysely.insertInto("Resource_Tag");
	},
	update() {
		return db.kysely.updateTable("Resource_Tag");
	},
	remove() {
		return db.kysely.deleteFrom("Resource_Tag");
	},
	select() {
		return db.kysely
			.selectFrom("Resource_Tag as rt")
			.selectAll("rt")
			.leftJoin("Resource as r", "r.id", "rt.resourceId")
			.leftJoin("Tag as t", "t.id", "rt.tagId");
	},
});
