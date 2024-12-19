import { createFileRoute, redirect } from "@tanstack/react-router";
import { localeOf } from "@use-pico/common";
import { defaultLocale, locales } from "~/locales";

export const Route = createFileRoute("/")({
	loader: async () => {
		throw redirect({
			to: "/$locale",
			params: {
				locale: localeOf({
					available: locales,
					fallback: defaultLocale,
				}),
			},
		});
	},
});
