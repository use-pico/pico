import { useMutation } from "@tanstack/react-query";
import { kysely } from "~/app/derivean/db/db";
import { withDefaultKingdom } from "~/app/derivean/public/withDefaultKingdom";
import type { RegisterSchema } from "~/app/derivean/schema/RegisterSchema";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";
import { UserSource } from "~/app/derivean/user/UserSource";

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
					await UserSource.create$({
						tx,
						shape: {
							name,
							login,
							password: password1,
						},
						entity: {
							name,
							login,
							password: password1,
						},
					}),
				);

				await withDefaultKingdom({ tx, userId: session.id });

				return session;
			});
		},
	});
};
