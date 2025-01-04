import { withRepository } from "@use-pico/client";
import { pwd } from "@use-pico/common";
import type { Database } from "~/app/derivean/db/Database";
import { UserSchema } from "~/app/derivean/user/UserSchema";

export const UserRepository = withRepository<Database, UserSchema>({
	name: "UserRepository",
	schema: UserSchema,
	select({
		tx,
		query: { where, filter, cursor = { page: 0, size: 10 } },
		use,
	}) {
		let $select = tx.selectFrom("User as u").selectAll("u");

		const fulltext = (input: string) => {
			const $input = `%${input}%`;
			return $select.where((ex) => {
				return ex.or([
					ex("u.id", "like", $input),
					ex("u.name", "like", $input),
					ex("u.login", "like", $input),
				]);
			});
		};

		const $where = (where?: UserSchema["~filter"]) => {
			if (where?.id) {
				$select = $select.where("u.id", "=", where.id);
			}

			if (where?.password) {
				$select = $select.where("u.password", "=", where.password);
			}

			if (where?.login) {
				$select = $select.where("u.login", "=", where.login);
			}

			if (where?.fulltext) {
				$select = fulltext(where.fulltext);
			}
		};

		if (use?.includes("filter")) {
			$where(filter || {});
		}
		if (use?.includes("where")) {
			$where(where || {});
		}

		if (use?.includes("cursor")) {
			$select = $select.limit(cursor.size).offset(cursor.page * cursor.size);
		}

		return $select;
	},
	insert({ tx }) {
		return tx.insertInto("User");
	},
	update({ tx, filter }) {
		let $update = tx.updateTable("User");

		if (filter?.id) {
			$update = $update.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$update = $update.where("id", "in", filter.idIn);
		}

		return $update;
	},
	remove({ tx, filter }) {
		let $remove = tx.deleteFrom("User");

		if (filter?.id) {
			$remove = $remove.where("id", "=", filter.id);
		}
		if (filter?.idIn && filter.idIn.length) {
			$remove = $remove.where("id", "in", filter.idIn);
		}

		return $remove;
	},
	map: {
		async toCreate({ entity: { password, ...entity } }) {
			return {
				...entity,
				password: password ? pwd.hash(password) : undefined,
			};
		},
	},
});
