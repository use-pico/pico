import { TranslationSources } from "@use-pico/client";
import { tx } from "@use-pico/server";

tx({
	packages: [
		`${__dirname}/..`,
	],
	output: `${__dirname}/../src/translation`,
	locales: [
		"cs",
		"en",
	],
	sources: TranslationSources,
});
