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

		// const result = SessionSchema.safeParse(ls.get("session"));

		// if (result.success) {
		// 	throw redirect({
		// 		to: `/$locale/apps`,
		// 		params: { locale },
		// 	});
		// }

		// throw redirect({
		// 	to: "/$locale/public/",
		// 	params: {
		// 		locale,
		// 	},
		// });
	},
});
