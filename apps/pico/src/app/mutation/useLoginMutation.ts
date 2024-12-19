import { useMutation } from "@tanstack/react-query";
import type { LoginSchema } from "~/app/schema/LoginSchema";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["useLoginMutation"],
		async mutationFn(props: LoginSchema.Type): Promise<SessionSchema.Type> {
			return {};
		},
	});
};
