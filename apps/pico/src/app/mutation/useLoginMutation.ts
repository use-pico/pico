import { useMutation } from "@tanstack/react-query";
import { pwd } from "@use-pico/common";
import type { LoginSchema } from "~/app/schema/LoginSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";
import type { withUserRepository } from "~/app/user/withUserRepository";

export namespace useLoginMutation {
	export interface Props {
		repository: withUserRepository.Instance;
	}
}

export const useLoginMutation = ({ repository }: useLoginMutation.Props) => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn({
			login,
			password,
		}: LoginSchema.Type): Promise<SessionSchema.Type> {
			const user = await repository.fetch({
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
		},
	});
};
