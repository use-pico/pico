import { useMutation } from "@tanstack/react-query";
import { pwd } from "@use-pico/common";
import type { Database } from "~/app/derivean/db/Database";
import { kysely } from "~/app/derivean/db/db";
import type { LoginSchema } from "~/app/schema/LoginSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";
import type { withUserRepository } from "~/app/user/withUserRepository";

export namespace useLoginMutation {
	export interface Props {
		repository: withUserRepository.Instance<Database>;
	}
}

export const useLoginMutation = ({ repository }: useLoginMutation.Props) => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn({
			login,
			password,
		}: LoginSchema.Type): Promise<SessionSchema.Type> {
			return kysely.transaction().execute(async (tx) => {
				const user = await repository(tx).fetch({
					tx,
					query: {
						where: {
							login,
							password: pwd.hash(password),
						},
					},
				});

				if (!user) {
					throw new Error("Invalid login or password");
				}

				return {
					id: user.id,
					login: user.login,
					name: user.name,
				};
			});
		},
	});
};
