import { createFileRoute, redirect } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createFileRoute("/$locale/")({
	beforeLoad: async ({ params: { locale } }) => {
		const sessionResult = SessionSchema.safeParse(ls.get("session"));

		if (sessionResult.success) {
			throw redirect({
				to: `/$locale/apps`,
				params: { locale },
			});
		}

		throw redirect({
			to: `/$locale/public/login`,
			params: { locale },
		});
	},
});
