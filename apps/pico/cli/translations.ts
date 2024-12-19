import { tx } from "@use-pico/server";

tx({
	packages: [`${__dirname}/..`],
	output: `${__dirname}/../src/translation`,
	locales: ["cs", "en"],
});
