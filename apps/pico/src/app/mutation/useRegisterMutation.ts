import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "~/app/schema/RegisterSchema";
import { SessionSchema } from "~/app/schema/SessionSchema";
import type { withUserRepository } from "~/app/user/withUserRepository";

export namespace useRegisterMutation {
	export interface Props {
		repository: withUserRepository.Instance;
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
			/**
			 * Secondary SessionSchema parse is here to ensure only session related data
			 * get out.
			 */
			return SessionSchema.parse(
				await repository.create({
					shape: {
						name,
						login,
						password: password1,
					},
				}),
			);
		},
	});
};
