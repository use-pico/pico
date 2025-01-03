import { withRepository } from "@use-pico/client";
import { pwd } from "@use-pico/common";
import { UserSchema } from "~/app/user/UserSchema";

export namespace withUserRepository {
	export interface DatabaseType {
		User: UserSchema["~entity"];
	}

	export type Instance<TDatabase extends DatabaseType> = ReturnType<
		typeof withUserRepository<TDatabase>
	>;
}

export const withUserRepository = <
	TDatabase extends withUserRepository.DatabaseType,
>() => {
	return withRepository<TDatabase, UserSchema>({
		name: "UserRepository",
		schema: UserSchema,
		meta: {
			where: {
				id: "u.id",
				idIn: "u.id",
				login: "u.login",
				password: "u.password",
			},
		},
		select({ tx }) {
			return tx.selectFrom("User as u").selectAll("u");
		},
		mutation: {
			insert({ tx }) {
				return tx.insertInto("User");
			},
			update({ tx }) {
				return tx.updateTable("User");
			},
			remove({ tx }) {
				return tx.deleteFrom("User");
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