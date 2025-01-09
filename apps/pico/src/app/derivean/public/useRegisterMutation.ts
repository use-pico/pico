import { useMutation } from "@tanstack/react-query";
import { genId, pwd } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { withDefaultKingdom } from "~/app/derivean/public/withDefaultKingdom";
import type { RegisterSchema } from "~/app/derivean/schema/RegisterSchema";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const useRegisterMutation = () => {
	return useMutation({
		mutationKey: ["useRegisterMutation"],
		async mutationFn({
			login,
			name,
			password1,
		}: RegisterSchema.Type): Promise<SessionSchema.Type> {
			return kysely.transaction().execute(async (tx) => {
				/**
				 * Secondary SessionSchema parse is here to ensure only session related data
				 * get out.
				 */
				const session = SessionSchema.parse(
					await tx
						.insertInto("User")
						.values({
							id: genId(),
							name,
							login,
							password: pwd.hash(password1),
						})
						.returning(["User.id", "User.name", "User.login"])
						.executeTakeFirstOrThrow(),
				);

				try {
					await withDefaultKingdom({ tx, userId: session.id });
				} catch (e) {
					console.error(e);
				}

				return session;
			});
		},
	});
};
