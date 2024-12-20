import { useMutation } from "@tanstack/react-query";
import { pwd } from "@use-pico/common";
import { dexie } from "~/app/dexie/dexie";
import type { LoginSchema } from "~/app/schema/LoginSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn({
			login,
			password,
		}: LoginSchema.Type): Promise<SessionSchema.Type> {
			const user = await dexie.User.where({
				login,
				password: pwd.hash(password),
			}).first();

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
