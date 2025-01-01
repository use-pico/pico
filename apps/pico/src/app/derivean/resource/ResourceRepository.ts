import { withRepository } from "@use-pico/client";
import { db } from "~/app/derivean/db/db";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTagRepository } from "~/app/derivean/resource/tag/ResourceTagRepository";
import { TagRepository } from "~/app/derivean/tag/TagRepository";

export const ResourceRepository = withRepository({
	name: "Resource",
	schema: ResourceSchema,
	meta: {
		where: {
			id: "resource.id",
			idIn: "resource.id",
		},
		fulltext: ["resource.description", "resource.name", "resource.id"],
	},
	insert() {
		return db.kysely.insertInto("Resource");
	},
	update() {
		return db.kysely.updateTable("Resource");
	},
	remove() {
		return db.kysely.deleteFrom("Resource");
	},
	select() {
		return db.kysely.selectFrom("Resource as resource").selectAll("resource");
	},
	async toOutput({ entity }) {
		const tagIds = (
			await ResourceTagRepository.list({
				query: {
					where: {
						resourceId: entity.id,
					},
				},
			})
		).map(({ tagId }) => tagId);

		return {
			...entity,
			tagIds,
			tags: await TagRepository.list({
				query: {
					where: {
						idIn: tagIds,
					},
				},
			}),
		};
	},
	event: {
		async onPostCreate({ entity, shape }) {
			await Promise.all(
				shape.tagIds?.forEach(async (tagId) => {
					return ResourceTagRepository.create({
						entity: {
							resourceId: entity.id,
							tagId,
						},
						shape: {
							resourceId: entity.id,
							tagId,
						},
					});
				}) || [],
			);
		},
		async onPostPatch({ entity, shape }) {
			if (Array.isArray(shape.tagIds)) {
				await db.kysely
					.deleteFrom("ResourceTag")
					.where("resourceId", "=", entity.id)
					.execute();

				await Promise.all(
					shape.tagIds.map(async (tagId) => {
						return ResourceTagRepository.create({
							entity: {
								resourceId: entity.id,
								tagId,
							},
							shape: {
								resourceId: entity.id,
								tagId,
							},
						});
					}),
				);
			}
		},
	},
});