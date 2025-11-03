import { TranslationSources } from "@use-pico/client/translation";
import { tx } from "@use-pico/server/tx";

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
