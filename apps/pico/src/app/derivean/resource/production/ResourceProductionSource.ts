import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { ResourceProductionSchema } from "~/app/derivean/resource/production/ResourceProductionSchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const ResourceProductionSource = withSource({
	name: "ResourceProductionSource",
	schema: ResourceProductionSchema,
	db: kysely,
	select$({
		tx,
		where,
		filter,
		link,
		cursor = { page: 0, size: 10 },
		sort,
		use,
	}) {
		let $select = tx
			.selectFrom("Resource_Production as rp")
			.leftJoin("Resource as r", "r.id", "rp.resourceId");

		$select = $select.selectAll("rp");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("rp.id");
		}

		const $sort = {
			amount: "rp.amount",
			cycles: "rp.cycles",
			limit: "rp.limit",
			resource: "r.name",
		} as const satisfies Record<
			ResourceProductionSchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("rp.id", "like", $input),
					ex("r.name", "like", $input),
				]);
			});
		};

		const $where = (where?: ResourceProductionSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("rp.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("rp.id", "in", where.idIn);
			}

			if (where?.resourceId) {
				$select = $select.where("rp.resourceId", "=", where.resourceId);
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

		if (link) {
			$select = $select.where("rp.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Resource_Production");
	},
	patch$({ tx }) {
		return tx.updateTable("Resource_Production");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Resource_Production");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				resource: await ResourceSource.getOrThrow$({
					tx,
					id: entity.resourceId,
					error: "Cannot fetch resource for resource production",
				}),
			};
		},
	},
});
