import type { TranslationSource } from "@use-pico/common/type";

export const TranslationSources: TranslationSource.Sources = {
	jsx: [
		{
			name: "Tx",
			attr: "label",
		},
		{
			name: "Mx",
			attr: "label",
		},
		//
		{
			name: "Button",
			attr: "label",
		},
		//
		{
			name: "ModalFooter",
			attr: "cancelText",
		},
		{
			name: "ModalFooter",
			attr: "confirmText",
		},
		//
		{
			name: "Status",
			attr: "textTitle",
		},
		{
			name: "Status",
			attr: "textMessage",
		},
		//
		{
			name: "Fulltext",
			attr: "textPlaceholder",
		},
		//
		{
			name: "TextInput",
			attr: "placeholder",
		},
	],
	functions: [],
	objects: [
		{
			object: "translator",
			name: "text",
		},
	],
};
