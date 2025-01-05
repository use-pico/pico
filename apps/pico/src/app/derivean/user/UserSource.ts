import { pwd, withSource } from "@use-pico/common";
import type { Database } from "~/app/derivean/db/Database";
import { kysely } from "~/app/derivean/db/db";
import { UserSchema } from "~/app/derivean/user/UserSchema";

export const UserSource = withSource<Database, UserSchema>({
	name: "UserSource",
	schema: UserSchema,
	db: kysely,
	select$({ tx, where, filter, cursor = { page: 0, size: 10 }, use }) {
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
		return tx.insertInto("User");
	},
	patch$({ tx }) {
		return tx.updateTable("User");
	},
	delete$({ tx }) {
		return tx.deleteFrom("User");
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
