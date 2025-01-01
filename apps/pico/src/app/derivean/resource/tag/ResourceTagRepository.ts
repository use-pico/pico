import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";

export const ResourceTagRepository = withRepository({
	name: "ResourceTagRepository",
	schema: ResourceTagSchema,
	meta: {
		where: {
			id: "resourceTag.id",
			idIn: "resourceTag.id",
			resourceId: "resourceTag.resourceId",
			tagId: "resourceTag.tagId",
		},
		fulltext: [
			"resource.id",
			"resource.name",
			"resourceTag.id",
			"tag.code",
			"tag.group",
			"tag.id",
			"tag.label",
		],
	},
	insert() {
		return db.kysely.insertInto("ResourceTag");
	},
	update() {
		return db.kysely.updateTable("ResourceTag");
	},
	remove() {
		return db.kysely.deleteFrom("ResourceTag");
	},
	select() {
		return db.kysely
			.selectFrom("ResourceTag as resourceTag")
			.selectAll("resourceTag")
			.leftJoin("Resource as resource", "resource.id", "resourceTag.resourceId")
			.leftJoin("Tag as tag", "tag.id", "resourceTag.tagId");
	},
});
