import { createFileRoute, redirect } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { localeOf } from "@use-pico/common";
import { SessionSchema } from "~/app/schema/SessionSchema";
import { defaultLocale, locales } from "~/locales";

export const Route = createFileRoute("/")({
	loader: async () => {
		const locale = localeOf({
			available: locales,
			fallback: defaultLocale,
		});

		const result = SessionSchema.safeParse(ls.get("session"));

		if (result.success) {
			throw redirect({
				to: `/$locale/apps`,
				params: { locale },
			});
		}

		throw redirect({
			to: "/$locale/public/login",
			params: {
				locale,
			},
		});
	},
});
