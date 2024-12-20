import { createFileRoute, redirect } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps")({
	loader({ params: { locale } }) {
		try {
			return {
				session: SessionSchema.parse(ls.get("session")),
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			throw redirect({
				to: `/$locale/public/login`,
				params: { locale },
			});
		}
	},
});
