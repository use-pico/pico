import fs from "node:fs";
import { print, project, query } from "@phenomnomnominal/tsquery";
import {
	diffOf,
	keyOf,
	Timer,
	type TranslationSchema,
	type TranslationSource,
} from "@use-pico/common";
import cliProgress from "cli-progress";
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
		 * File filter regex. Defaults to matching only .ts and .tsx files.
		 */
		filter?: RegExp;
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
	filter = /(?<!\.d)\.tsx?$/,
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

	let files = 0;

	packages.forEach((path) => {
		const sources = project(`${path}/tsconfig.json`).filter((source) =>
			filter.test(source.fileName),
		);
		const total = sources.length;

		console.log(`\n📦 Package: ${path}`);
		console.log(`📄 Files to process: ${total}\n`);

		const progressBar = new cliProgress.SingleBar(
			{
				format: "Processing |{bar}| {percentage}% | {value}/{total} files | {file}",
				barCompleteChar: "\u2588",
				barIncompleteChar: "\u2591",
				hideCursor: true,
			},
			cliProgress.Presets.shades_classic,
		);

		progressBar.start(total, 0, {
			file: "starting...",
		});

		const benchmark = Timer.benchmark(() => {
			sources.forEach((source, index) => {
				files++;
				progressBar.update(index + 1, {
					file: source.fileName.split("/").pop(),
				});
				const addTranslation = (node: any) => {
					const printed = print(node);
					const text = printed.substring(1, printed.length - 1);
					translations[keyOf(text)] = {
						ref: text,
						value: text,
					};
				};

				// Extract from JSX attributes (compile all sources into one query)
				if (jsxSources.length > 0) {
					const jsxSelector = jsxSources
						.flatMap(({ name, attr }) => [
							`JsxSelfClosingElement:has(Identifier[name=${name}]) JsxAttribute:has(Identifier[name=${attr}])`,
							`JsxOpeningElement:has(Identifier[name=${name}]) JsxAttribute:has(Identifier[name=${attr}])`,
						])
						.join(", ");

					query(source, jsxSelector).forEach((attr) => {
						query(
							attr,
							"StringLiteral, JsxExpression NoSubstitutionTemplateLiteral, JsxExpression TemplateExpression",
						).forEach(addTranslation);
					});
				}

				// Extract from function calls (compile all sources into one query)
				if (functionSources.length > 0) {
					const functionSelector = functionSources
						.map(
							({ name }) =>
								`CallExpression:has(Identifier[name=${name}])`,
						)
						.join(", ");

					query(source, functionSelector).forEach((call) => {
						query(
							call,
							"StringLiteral, NoSubstitutionTemplateLiteral, TemplateExpression",
						).forEach(addTranslation);
					});
				}

				// Extract from object method calls (compile all sources into one query)
				if (objectSources.length > 0) {
					const objectSelector = objectSources
						.map(
							({ object, name }) =>
								`CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}]))`,
						)
						.join(", ");

					query(source, objectSelector).forEach((call) => {
						query(
							call,
							"StringLiteral, NoSubstitutionTemplateLiteral, TemplateExpression",
						).forEach(addTranslation);
					});
				}
			});
		});

		progressBar.stop();
		console.log(`✅ ${benchmark.format("Completed in %s.%ms s")}\n`);
	});

	fs.mkdirSync(output, {
		recursive: true,
	});

	console.log(`📝 Writing translations to ${locales.length} locale(s)...\n`);

	locales.forEach((locale) => {
		const target = `${output}/${locale}.${format}`;

		let current: Record<string, TranslationSchema.Type> = {};
		try {
			const fileContent = fs.readFileSync(target, {
				encoding: "utf-8",
			});
			current = (
				format === "json" ? JSON.parse(fileContent) : parse(fileContent)
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

		console.log(`  📄 ${target}`);
	});

	console.log(
		`\n✨ Found ${Object.keys(translations).length} translations across ${files} files\n`,
	);
};
