import { keyOf } from "../key-of/keyOf";
import type { TranslationListSchema } from "../schema/TranslationListSchema";

export namespace translator {
	export interface Value {
		text: string;
		type: "hash" | "text" | "fallback" | "key";
	}

	export interface Translator {
		index: TranslationListSchema.Type;
		push(translations: TranslationListSchema.Type): void;
		value(key: string, fallback?: string): Value;
		text(key: string, fallback?: string): string;
	}
}

export const translator: translator.Translator = {
	index: {},
	push(translations) {
		this.index = {
			...this.index,
			...translations,
		};
	},
	value(key, fallback) {
		let text: string | undefined;

		if ((text = this.index[keyOf(key)]?.value)) {
			return {
				text,
				type: "hash",
			};
		}

		if ((text = this.index[key]?.value)) {
			return {
				text,
				type: "text",
			};
		}

		if ((text = fallback)) {
			return {
				text,
				type: "fallback",
			};
		}

		return {
			text: key,
			type: "key",
		};
	},
	text(key, fallback) {
		return this.value(key, fallback).text;
	},
};
