import type { TranslationSource } from "@use-pico/common";

export const TranslationSources: TranslationSource.Sources = {
	jsx: [
		{
			name: "Tx",
			attr: "label",
		},
		{
			name: "Status",
			attr: "textTitle",
		},
		{
			name: "Status",
			attr: "textMessage",
		},
	],
	functions: [],
	objects: [
		{
			object: "translator",
			name: "text",
		},
		{
			object: "translator",
			name: "rich",
		},
	],
};
