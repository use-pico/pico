import { withRepository } from "@use-pico/client";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTagRepository } from "~/app/derivean/resource/tag/ResourceTagRepository";
import { TagRepository } from "~/app/derivean/tag/TagRepository";

export const ResourceRepository = withRepository<Database, ResourceSchema>({
	name: "Resource",
	schema: ResourceSchema,
	meta: {
		where: {
			id: "r.id",
			idIn: "r.id",
			baseBuildingId: "bbr.baseBuildingId",
		},
		fulltext: ["r.description", "r.name", "r.id"],
	},
	select({ tx, query: { where, filter } }) {
		let $select = tx.selectFrom("Resource as r").selectAll("r");

		if (where?.baseBuildingId || filter?.baseBuildingId) {
			$select = $select.leftJoin(
				"BaseBuilding_Requirement as bbr",
				"bbr.resourceId",
				"r.id",
			);
		}
		return $select;
	},
	mutation: {
		insert({ tx }) {
			return tx.insertInto("Resource");
		},
		update({ tx }) {
			return tx.updateTable("Resource");
		},
		remove({ tx }) {
			return tx.deleteFrom("Resource");
		},
	},
	map: {
		async toOutput({ tx, entity }) {
			const tagIds = (
				await ResourceTagRepository(tx).list({
					tx,
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
				tags: await TagRepository(tx).list({
					tx,
					query: {
						where: {
							idIn: tagIds,
						},
					},
				}),
			};
		},
	},
	event: {
		async onPostCreate({ tx, entity, shape }) {
			await Promise.all(
				shape.tagIds?.forEach(async (tagId) => {
					return ResourceTagRepository(tx).create({
						tx,
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
		async onPostPatch({ tx, entity, shape }) {
			if (Array.isArray(shape.tagIds)) {
				await tx
					.deleteFrom("Resource_Tag")
					.where("resourceId", "=", entity.id)
					.execute();

				await Promise.all(
					shape.tagIds.map(async (tagId) => {
						return ResourceTagRepository(tx).create({
							tx,
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
