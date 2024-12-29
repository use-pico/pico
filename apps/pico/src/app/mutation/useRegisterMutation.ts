import { useMutation } from "@tanstack/react-query";
import { id, pwd } from "@use-pico/common";
import type { RegisterSchema } from "~/app/schema/RegisterSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export const useRegisterMutation = () => {
	return useMutation({
		mutationKey: ["useRegisterMutation"],
		async mutationFn({
			login,
			name,
			password1,
		}: RegisterSchema.Type): Promise<SessionSchema.Type> {
			const session = {
				id: id(),
				name,
				login,
			} satisfies SessionSchema.Type;

			await dexie.User.add({
				...session,
				password: pwd.hash(password1),
			});

			return session;
		},
	});
};
