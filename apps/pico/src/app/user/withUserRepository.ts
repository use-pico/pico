import { withRepository } from "@use-pico/client";
import {
    pwd,
    type Database
} from "@use-pico/common";
import { UserSchema } from "~/app/user/UserSchema";

export namespace withUserRepository {
	export interface DatabaseType {
		User: UserSchema["~entity"];
	}

	export interface Props<TDatabase extends DatabaseType> {
		database: Database.Instance<TDatabase>;
	}

	export type Instance<TDatabase extends DatabaseType> = ReturnType<
		typeof withUserRepository<TDatabase>
	>;
}

export const withUserRepository = <
	TDatabase extends withUserRepository.DatabaseType,
>({
	database,
}: withUserRepository.Props<TDatabase>) => {
	return withRepository({
		name: "UserRepository",
		db: database.kysely,
		schema: UserSchema,
		meta: {
			where: {
				id: "u.id",
				idIn: "u.id",
				login: "u.login",
				password: "u.password",
			},
		},
		select() {
			return database.kysely.selectFrom("User as u").selectAll("u");
		},
		mutation: {
			insert() {
				return database.kysely.insertInto("User");
			},
			update() {
				return database.kysely.updateTable("User");
			},
			remove() {
				return database.kysely.deleteFrom("User");
			},
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
};
