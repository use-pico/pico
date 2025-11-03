import qs, { type IStringifyOptions } from "qs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParamMap = Record<string, any>;

type UrlCatConfiguration = Partial<
	Pick<IStringifyOptions, "arrayFormat"> & {
		objectFormat: Partial<Pick<IStringifyOptions, "format">>;
	}
>;

function join(part1: string, separator: string, part2: string): string {
	const p1 = part1.endsWith(separator)
		? part1.slice(0, -separator.length)
		: part1;
	const p2 = part2.startsWith(separator)
		? part2.slice(separator.length)
		: part2;
	return p1 === "" || p2 === "" ? p1 + p2 : p1 + separator + p2;
}

function nullOrUndefined<T>(v: T) {
	return v === undefined || v === null;
}

function removeNullOrUndef<P extends ParamMap>(params: P) {
	return Object.entries(params).reduce(
		(result, [key, value]) => {
			if (nullOrUndefined(value)) {
				return result;
			}
			// biome-ignore lint/performance/noAccumulatingSpread: Too lazy to fix
			return Object.assign(result, {
				[key]: value,
			});
		},
		{} as { [K in keyof P]: NonNullable<P[K]> },
	);
}

function validatePathParam(params: ParamMap, key: string) {
	const allowedTypes = [
		"boolean",
		"string",
		"number",
	];

	if (!Object.hasOwn(params, key)) {
		throw new Error(`Missing value for path parameter ${key}.`);
	}
	if (!allowedTypes.includes(typeof params[key])) {
		throw new TypeError(
			`Path parameter ${key} cannot be of type ${typeof params[key]}. ` +
				`Allowed types are: ${allowedTypes.join(", ")}.`,
		);
	}
	if (typeof params[key] === "string" && params[key].trim() === "") {
		throw new Error(`Path parameter ${key} cannot be an empty string.`);
	}
}

function path(template: string, params: ParamMap) {
	const remainingParams = {
		...params,
	};

	const renderedPath = template.replace(/:[_A-Za-z]+[_A-Za-z0-9]*/g, (p) => {
		// do not replace "::"
		const key = p.slice(1);
		validatePathParam(params, key);
		delete remainingParams[key];
		return encodeURIComponent(params[key]);
	});

	return {
		renderedPath,
		remainingParams,
	};
}

function query(params: ParamMap, config?: UrlCatConfiguration): string {
	/* NOTE: Handle quirk of `new UrlSearchParams(params).toString()` in Webkit 602.x.xx
	 *       versions which returns stringified object when params is empty object
	 */
	if (Object.keys(params).length < 1) {
		return "";
	}

	const qsConfiguration: IStringifyOptions = {
		format: config?.objectFormat?.format ?? "RFC1738", // RDC1738 is urlcat's current default. Breaking change if default is changed
		arrayFormat: config?.arrayFormat,
	};

	return qs.stringify(params, qsConfiguration);
}

function joinFullUrl(
	renderedPath: string,
	baseUrl: string,
	pathAndQuery: string,
): string {
	if (renderedPath.length) {
		return join(baseUrl, "/", pathAndQuery);
	} else {
		return join(baseUrl, "?", pathAndQuery);
	}
}

function urlcat(
	baseUrl: string,
	pathTemplate: string,
	params: ParamMap = {},
	config: UrlCatConfiguration = {},
): string {
	const { renderedPath, remainingParams } = path(pathTemplate, params);
	const cleanParams = removeNullOrUndef(remainingParams);
	const renderedQuery = query(cleanParams, config);
	const pathAndQuery = join(renderedPath, "?", renderedQuery);

	return joinFullUrl(renderedPath, baseUrl, pathAndQuery);
}

export namespace linkTo {
	export interface Props {
		/**
		 * @example
		 * 		linkTo({
		 * 			base: import.meta.env.BASE_URL,
		 * 			href: "/foo/:id/bar?foo=bar",
		 * 			query: { id: "123", foo: "bar" },
		 * 		})
		 */
		base?: string;
		href: string;
		query?: ParamMap;
	}
}

/**
 * Generates a link and replaces "templates" with a proper values from the query object.
 *
 * @group toolbox
 *
 * @example
 * /foo/:id/bar => /foo/123/bar
 */
export const linkTo = ({ base = "", query = {}, href }: linkTo.Props) => {
	return urlcat(base, href, query);
};
