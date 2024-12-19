import { createFileRoute } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps")({
	loader() {
		return {
			session: SessionSchema.parse(ls.get("session")),
		};
	},
});
