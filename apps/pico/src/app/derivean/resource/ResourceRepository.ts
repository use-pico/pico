import { withRepository } from "@use-pico/client";
import type { Database } from "~/app/derivean/db/Database";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTagRepository } from "~/app/derivean/resource/tag/ResourceTagRepository";
import { TagRepository } from "~/app/derivean/tag/TagRepository";

export const ResourceRepository = withRepository<Database, ResourceSchema>({
	name: "Resource",
	schema: ResourceSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx
			.selectFrom("Resource as r")
			.selectAll("r")
			.leftJoin("BaseBuilding_Requirement as bbr", "bbr.resourceId", "r.id");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("r.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: ResourceSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("r.id", "=", where.id);
			}

			if (where?.idIn && where.idIn.length) {
				$select = $select.where("r.id", "in", where.idIn);
			}

			if (where?.baseBuildingId) {
				$select = $select.where(
					"bbr.baseBuildingId",
					"=",
					where.baseBuildingId,
				);
			}

			if (where?.fulltext) {
				$select = fulltext(where.fulltext);
			}
		};

		if (use.includes("filter")) {
			$where(filter || {});
		}

		if (use.includes("where")) {
			$where(where || {});
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	insert({ tx }) {
		return tx.insertInto("Resource");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("Resource");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}

		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("Resource");

		if (filter?.id) {
			$remove = $remove.where("id", "=", filter.id);
		}

		if (filter?.idIn && filter.idIn.length) {
			$remove = $remove.where("id", "in", filter.idIn);
		}

		return $remove;
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

export type ResourceRepository = ReturnType<typeof ResourceRepository>;
