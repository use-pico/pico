import { useMutation } from "@tanstack/react-query";
import { pwd } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import type { LoginSchema } from "~/app/derivean/schema/LoginSchema";
import type { SessionSchema } from "~/app/derivean/schema/SessionSchema";
import { UserSource } from "~/app/derivean/user/UserSource";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn({
			login,
			password,
		}: LoginSchema.Type): Promise<SessionSchema.Type> {
			return kysely.transaction().execute(async (tx) => {
				const user = await UserSource.fetchOrThrow$({
					tx,
					where: {
						login,
						password: pwd.hash(password),
					},
					error: "Invalid login or password",
				});

				return {
					id: user.id,
					login: user.login,
					name: user.name,
				};
			});
		},
	});
};
