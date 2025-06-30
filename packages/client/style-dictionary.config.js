import StyleDictionary from "style-dictionary";

StyleDictionary.registerFormat({
	name: "pico/contract",
	format({ dictionary, platform }) {
		const groups = {};
		const platformPrefix = platform.prefix ? `${platform.prefix}-` : "";

		dictionary.allTokens.forEach((token) => {
			const selector = `.${token.attributes?.type ?? "unknown"}`;
			if (!groups[selector]) {
				groups[selector] = [];
			}

			const name = token.path.slice(1).join("-");

			let value = token.original.value;

			const match =
				typeof value === "string" ? value.match(/^\{(.+)\}$/u) : null;

			if (match) {
				const referencedTokenPath = match[1]
					.split(".")
					.slice(1)
					.join("-");
				value = `var(--${platformPrefix}${referencedTokenPath})`;
			}

			const groupLabel = token.path[1];

			groups[selector].push({
				label: groupLabel,
				variable: `  --${platformPrefix}${name}: ${value};`,
			});
		});

		return Object.entries(groups)
			.map(([selector, tokens]) => {
				const grouped = {};

				tokens.forEach(({ label, variable }) => {
					if (!grouped[label]) grouped[label] = [];
					grouped[label].push(variable);
				});

				const block = Object.entries(grouped)
					.map(([label, vars]) => {
						return `  /* ${label} */\n${vars.join("\n")}\n`;
					})
					.join("\n");

				return `${selector} {\n${block}}\n`;
			})
			.join("\n\n");
	},
});
StyleDictionary.registerTransform({
	name: "pico/prefixed",
	type: "name",
	transform(token) {
		const prefix = token.attributes?.type ?? "unknown";
		return `${prefix}-${token.path.join("-")}`;
	},
});
StyleDictionary.registerTransformGroup({
	name: "pico/css",
	transforms: [
		"attribute/cti",
		"pico/prefixed",
		"color/css",
		"size/px",
	],
});

export default {
	source: [
		"src/@tokens/**/*.js",
		"src/**/*.cls.js",
	],
	log: {
		verbosity: "verbose",
	},
	platforms: {
		variables: {
			transformGroup: "css",
			buildPath: "src/@style",
			prefix: "pico",
			files: [
				{
					destination: "variables.css",
					format: "css/variables",
					options: {
						outputReferences: true,
					},
				},
			],
		},
	},
};
