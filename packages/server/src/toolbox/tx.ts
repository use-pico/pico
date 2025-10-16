import fs from "node:fs";
import { print, project, query } from "@phenomnomnominal/tsquery";
import {
	diffOf,
	keyOf,
	Timer,
	type TranslationSchema,
	type TranslationSource,
} from "@use-pico/common";
import { parse, stringify } from "yaml";

export namespace tx {
	export interface Translation {
		ref?: string;
		value: string;
	}

	export type Translations = Record<string, Translation>;

	export interface Props {
		packages: string[];
		output: string;
		locales: string[];
		/**
		 * Output format for translation files.
		 */
		format?: "json" | "yaml";
		/**
		 * JSX elements to extract translations from (e.g., `<Tx label="text" />`).
		 *
		 * **Important**: This is for **string extraction only**. Your application must still
		 * use the translator for actual translations at runtime.
		 */
		jsx?: TranslationSource.Jsx[];
		/**
		 * Direct function calls to extract translations from (e.g., `foo("text")`).
		 *
		 * **Important**: This is for **string extraction only**. Your application must still
		 * use the translator for actual translations at runtime.
		 */
		functions?: TranslationSource.Function[];
		/**
		 * Object method calls to extract translations from (e.g., `translator.text("text")`).
		 *
		 * **Important**: This is for **string extraction only**. Your application must still
		 * use the translator for actual translations at runtime.
		 */
		objects?: TranslationSource.Object[];
	}
}

export const tx = ({
	packages,
	output,
	locales,
	format = "yaml",
	jsx = [],
	functions = [],
	objects = [],
}: tx.Props) => {
	const translations: tx.Translations = {};

	const jsxSources: TranslationSource.Jsx[] = [
		{
			name: "Tx",
			attr: "label",
		},
		...jsx,
	];

	const functionSources: TranslationSource.Function[] = [
		...functions,
	];

	const objectSources: TranslationSource.Object[] = [
		{
			object: "translator",
			name: "text",
		},
		{
			object: "translator",
			name: "rich",
		},
		...objects,
	];

	packages.forEach((path) => {
		const benchmark = Timer.benchmark(() => {
			project(`${path}/tsconfig.json`)
				.filter((source) => !source.fileName.endsWith(".d.ts"))
				.forEach((source) => {
					const addTranslation = (node: any) => {
						const printed = print(node);
						const text = printed.substring(1, printed.length - 1);
						translations[keyOf(text)] = {
							ref: text,
							value: text,
						};
					};

					// jsxSources.forEach(({ name, attr }) => {
					// 	query(
					// 		source,
					// 		`JsxSelfClosingElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) StringLiteral`,
					// 	).forEach(addTranslation);

					// 	query(
					// 		source,
					// 		`JsxSelfClosingElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) JsxExpression NoSubstitutionTemplateLiteral`,
					// 	).forEach(addTranslation);

					// 	query(
					// 		source,
					// 		`JsxSelfClosingElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) JsxExpression TemplateExpression`,
					// 	).forEach(addTranslation);

					// 	query(
					// 		source,
					// 		`JsxOpeningElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) StringLiteral`,
					// 	).forEach(addTranslation);

					// 	query(
					// 		source,
					// 		`JsxOpeningElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) JsxExpression NoSubstitutionTemplateLiteral`,
					// 	).forEach(addTranslation);

					// 	query(
					// 		source,
					// 		`JsxOpeningElement:has(Identifier[name=${name}]) > JsxAttributes > JsxAttribute:has(Identifier[name=${attr}]) JsxExpression TemplateExpression`,
					// 	).forEach(addTranslation);
					// });

					functionSources.forEach(({ name }) => {
						query(
							source,
							`CallExpression:has(Identifier[name=${name}]) StringLiteral`,
						).forEach(addTranslation);

						query(
							source,
							`CallExpression:has(Identifier[name=${name}]) NoSubstitutionTemplateLiteral`,
						).forEach(addTranslation);

						query(
							source,
							`CallExpression:has(Identifier[name=${name}]) TemplateExpression`,
						).forEach(addTranslation);
					});

					objectSources.forEach(({ object, name }) => {
						query(
							source,
							`CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) StringLiteral`,
						).forEach(addTranslation);

						query(
							source,
							`CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) NoSubstitutionTemplateLiteral`,
						).forEach(addTranslation);

						query(
							source,
							`CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) TemplateExpression`,
						).forEach(addTranslation);
					});
				});
		});
		console.log(
			benchmark.format(`Package [${packages}] search time %s.%ms s`),
		);
	});

	fs.mkdirSync(output, {
		recursive: true,
	});

	const benchmark = Timer.benchmark(() => {
		locales.forEach((locale) => {
			const target = `${output}/${locale}.${format}`;

			console.log(`Writing locale [${locale}] to [${target}]`);

			let current: Record<string, TranslationSchema.Type> = {};
			try {
				const fileContent = fs.readFileSync(target, {
					encoding: "utf-8",
				});
				current = (
					format === "json"
						? JSON.parse(fileContent)
						: parse(fileContent)
				) as Record<string, any>;
			} catch (_) {
				// Noop
			}

			/**
			 * Delete dead keys
			 */
			for (const key of diffOf(
				Object.keys(current),
				Object.keys(translations),
			)) {
				if (current[key]?.static) {
					continue;
				}
				delete current[key];
			}

			const sorted = new Map(
				Object.entries({
					...translations,
					...current,
				}).sort(),
			);

			const content =
				format === "json"
					? JSON.stringify(Object.fromEntries(sorted), null, 2)
					: stringify(sorted);

			fs.writeFileSync(target, content, {
				encoding: "utf-8",
			});
		});
	});

	console.log(
		`Number of found translations: ${Object.keys(translations).length}`,
	);

	console.log(benchmark.format("Exported in %s.%ms s"));
};
