import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceTagSource } from "~/app/derivean/resource/tag/ResourceTagSource";
import { TagSource } from "~/app/derivean/tag/TagSource";

export const ResourceSource = withSource({
	name: "ResourceSource",
	schema: ResourceSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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
	create$({ tx }) {
		return tx.insertInto("Resource");
	},
	patch$({ tx }) {
		return tx.updateTable("Resource");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Resource");
	},
	map: {
		async toOutput({ tx, entity }) {
			const tagIds = (
				await ResourceTagSource.list$({
					tx,
					where: {
						resourceId: entity.id,
					},
				})
			).map(({ tagId }) => tagId);

			return {
				...entity,
				tagIds,
				tags: await TagSource.list$({
					tx,
					where: {
						idIn: tagIds,
					},
				}),
			};
		},
	},
	event: {
		async onPostCreate({ tx, entity, shape }) {
			await Promise.all(
				shape.tagIds?.forEach(async (tagId) => {
					return ResourceTagSource.create$({
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
						return ResourceTagSource.create$({
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
