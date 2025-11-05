import type { RcFile } from "syncpack";

export default {
	sortPackages: true,
	sortFirst: [
		"name",
		"description",
		"version",
		"type",
		"sideEffects",
		"scripts",
		"dependencies",
		"peerDependencies",
		"devDependencies",
		"trustedDependencies",
		"main",
		"module",
		"types",
		"files",
		"exports",
		"author",
		"license",
		"repository",
		"homepage",
		"bugs",
	],
	sortAz: [
		"dependencies",
		"devDependencies",
		"peerDependencies",
		"trustedDependencies",
		"keywords",
	],
	semverGroups: [
		{
			range: "",
		},
	],
} satisfies RcFile;
