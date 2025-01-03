import { useMutation } from "@tanstack/react-query";
import type { Database } from "~/app/derivean/db/Database";
import { db } from "~/app/derivean/db/db";
import { withDefaultKingdom } from "~/app/derivean/public/withDefaultKingdom";
import type { RegisterSchema } from "~/app/schema/RegisterSchema";
import { SessionSchema } from "~/app/schema/SessionSchema";
import type { withUserRepository } from "~/app/user/withUserRepository";

export namespace useRegisterMutation {
	export interface Props {
		repository: withUserRepository.Instance<Database>;
	}
}

export const useRegisterMutation = ({
	repository,
}: useRegisterMutation.Props) => {
	return useMutation({
		mutationKey: ["useRegisterMutation"],
		async mutationFn({
			login,
			name,
			password1,
		}: RegisterSchema.Type): Promise<SessionSchema.Type> {
			return db.kysely.transaction().execute(async (tx) => {
				/**
				 * Secondary SessionSchema parse is here to ensure only session related data
				 * get out.
				 */
				const session = SessionSchema.parse(
					await repository.create({
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
