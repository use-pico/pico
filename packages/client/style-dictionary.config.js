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
