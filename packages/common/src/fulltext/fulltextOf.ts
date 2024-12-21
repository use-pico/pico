import { flatOf } from "../toolbox/flatOf";
import { isString } from "../toolbox/isString";

export namespace fulltextOf {
	export interface Props {
		source: Record<string, any>;
		fulltext?: string | null;
	}
}

export const fulltextOf = ({ source, fulltext }: fulltextOf.Props): boolean => {
	if (!fulltext) {
		return true;
	}
	const $source = flatOf(source);
	const $fulltext = fulltext.toLowerCase();

	return Object.values($source).some((value) => {
		if (isString(value)) {
			return value.toLowerCase().includes($fulltext);
		}

		return false;
	});
};
