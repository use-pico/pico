import { useMutation } from "@tanstack/react-query";
import { pwd } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import type { LoginSchema } from "~/app/derivean/schema/LoginSchema";
import type { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn({
			login,
			password,
		}: LoginSchema.Type): Promise<SessionSchema.Type> {
			return kysely.transaction().execute(async (tx) => {
				const user = await tx
					.selectFrom("User as u")
					.select(["u.id", "u.login", "u.name"])
					.where("u.login", "=", login)
					.where("u.password", "=", pwd.hash(password))
					.executeTakeFirstOrThrow();

				return {
					id: user.id,
					login: user.login,
					name: user.name,
				};
			});
		},
	});
};
