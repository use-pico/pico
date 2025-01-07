import { withSource } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";

export const ResourceRequirementSource = withSource({
	name: "ResourceRequirementSource",
	schema: ResourceRequirementSchema,
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
			.selectFrom("Resource_Requirement as rr")
			.leftJoin("Resource as re", "re.id", "rr.resourceId")
			.leftJoin("Resource as rq", "rq.id", "rr.requirementId");

		$select = $select.selectAll("rr");
		if (use.includes("id")) {
			$select = $select.clearSelect().select("rr.id");
		}

		const $sort = {
			amount: "rr.amount",
			passive: "rr.passive",
			requirement: "rq.name",
			resource: "re.name",
		} as const satisfies Record<
			ResourceRequirementSchema["~sort-keyof"],
			string
		>;

		sort?.forEach(({ name, sort }) => {
			$select = $select.orderBy($sort[name], sort);
		});

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("rr.id", "like", $input),
					ex("re.name", "like", $input),
					ex("rq.name", "like", $input),
				]);
			});
		};

		const $where = (where?: ResourceRequirementSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("rr.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("rr.id", "in", where.idIn);
			}

			if (where?.requirementId) {
				$select = $select.where("rr.requirementId", "=", where.requirementId);
			}

			if (where?.resourceId) {
				$select = $select.where("rr.resourceId", "=", where.resourceId);
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
			$select = $select.where("rr.id", "in", link);
		}

		if (use.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	create$({ tx }) {
		return tx.insertInto("Resource_Requirement");
	},
	patch$({ tx }) {
		return tx.updateTable("Resource_Requirement");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Resource_Requirement");
	},
	map: {
		async toOutput({ tx, entity }) {
			return {
				...entity,
				requirement: await ResourceSource.getOrThrow$({
					tx,
					id: entity.requirementId,
					error: "Cannot fetch resource for resource requirement",
				}),
			};
		},
	},
});
