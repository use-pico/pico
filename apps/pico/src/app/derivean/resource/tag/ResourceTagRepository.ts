import { withRepository } from "@use-pico/client";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";

export const ResourceTagRepository = withRepository<
	Database,
	ResourceTagSchema
>({
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
	select({ tx }) {
		return tx
			.selectFrom("Resource_Tag as rt")
			.selectAll("rt")
			.leftJoin("Resource as r", "r.id", "rt.resourceId")
			.leftJoin("Tag as t", "t.id", "rt.tagId");
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("Resource_Tag");
		},
		update({ tx }) {
			return tx.updateTable("Resource_Tag");
		},
		remove({ tx }) {
			return tx.deleteFrom("Resource_Tag");
		},
	},
});
