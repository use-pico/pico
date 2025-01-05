import { DateTime, withSource } from "@use-pico/common";
import { CycleSchema } from "~/app/derivean/cycle/CycleSchema";
import { kysely } from "~/app/derivean/db/db";

export const CycleSource = withSource({
	name: "CycleSource",
	schema: CycleSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
		let $select = tx
			.selectFrom("Cycle as c")
			.selectAll("c")
			.leftJoin("User as u", "u.id", "c.userId");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([ex("c.id", "like", $input), ex("u.id", "like", $input)]);
			});
		};

		const $where = (where?: CycleSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("c.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("c.id", "in", where.idIn);
			}

			if (where?.userId) {
				$select = $select.where("c.userId", "=", where.userId);
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
		return tx.insertInto("Cycle");
	},
	patch$({ tx }) {
		return tx.updateTable("Cycle");
	},
	delete$({ tx }) {
		return tx.deleteFrom("Cycle");
	},
	map: {
		async toCreate({ entity }) {
			return {
				...entity,
				stamp: DateTime.utc().toSQLTime(),
			};
		},
	},
});
