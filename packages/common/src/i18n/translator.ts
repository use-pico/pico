import type { ReactNode } from "react";
import type { TranslationListSchema } from "../schema/TranslationListSchema";
import { keyOf } from "../toolbox/keyOf";

export namespace translator {
	export type TranslateText = (key: string, fallback?: string) => string;
	export type TranslateRich = (
		key: string,
		fallback?: ReactNode,
	) => ReactNode;

	export interface Translator {
		index: TranslationListSchema.Type;

		push(translations: TranslationListSchema.Type): void;

		text: TranslateText;
		rich: TranslateRich;
	}
}

export namespace translate {
	export interface Props<TFallback = string | ReactNode> {
		index: TranslationListSchema.Type;
		key: string;
		fallback?: TFallback;
	}
}

const translate = <TFallback = string | ReactNode>({
	index,
	key,
	fallback,
}: translate.Props<TFallback>) => {
	return index[keyOf(key)]?.value ?? index[key]?.value ?? fallback ?? key;
};

export namespace text {
	export interface Props {
		index: TranslationListSchema.Type;
		key: string;
		fallback?: string;
	}
}

const text = ({ index, key, fallback }: text.Props) => {
	return translate<string>({
		index,
		key,
		fallback,
	});
};

export namespace rich {
	export interface Props {
		index: TranslationListSchema.Type;
		key: string;
		fallback?: ReactNode;
	}
}

const rich = ({ index, key, fallback }: rich.Props) => {
	return translate<ReactNode>({
		index,
		key,
		fallback,
	});
};

export const translator: translator.Translator = {
	index: {},
	push(translations) {
		this.index = {
			...this.index,
			...translations,
		};
	},
	text: (key, fallback) =>
		text({
			index: translator.index,
			key,
			fallback,
		}),
	rich: (key, fallback) =>
		rich({
			index: translator.index,
			key,
			fallback,
		}),
};
