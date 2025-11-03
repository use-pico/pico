import fs from "node:fs";
import { print, project, query } from "@phenomnomnominal/tsquery";
import { diffOf } from "@use-pico/common/diff-of";
import { keyOf } from "@use-pico/common/key-of";
import type { TranslationSchema } from "@use-pico/common/schema";
import type { TranslationSource } from "@use-pico/common/type";
import cliProgress from "cli-progress";
import { Timer } from "timer-node";
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
		sources: TranslationSource.Sources;
	}
}

export const tx = ({
	packages,
	output,
	locales,
	format = "yaml",
	filter = /(?<!\.d)\.tsx?$/,
	sources,
}: tx.Props) => {
	const translations: tx.Translations = {};
	const sourceStats = new Map<string, string[]>();

	let files = 0;

	// Display length limits for translation strings
	const JSX_DISPLAY_LENGTH = 72;
	const FUNCTION_DISPLAY_LENGTH = 64;
	const OBJECT_DISPLAY_LENGTH = 64;

	// ANSI color codes
	const colors = {
		dim: "\x1b[2m",
		gray: "\x1b[90m",
		yellow: "\x1b[33m",
		cyan: "\x1b[36m",
		green: "\x1b[32m",
		blue: "\x1b[34m",
		brightCyan: "\x1b[96m",
		white: "\x1b[97m",
		reset: "\x1b[0m",
		bold: "\x1b[1m",
	};

	// Display configured sources
	console.log("\n🔍 Extraction Sources Configuration:\n");

	if (sources.jsx.length > 0) {
		console.log("  📌 JSX Components:");
		for (const { name, attr } of sources.jsx) {
			console.log(
				`     <${colors.cyan}${name}${colors.reset} ${colors.green}${attr}${colors.reset}="..." />`,
			);
			sourceStats.set(`jsx:${name}.${attr}`, []);
		}
		console.log();
	}

	if (sources.functions.length > 0) {
		console.log("  📌 Functions:");
		for (const { name } of sources.functions) {
			console.log(`     ${colors.blue}${name}${colors.reset}("...")`);
			sourceStats.set(`function:${name}`, []);
		}
		console.log();
	}

	if (sources.objects.length > 0) {
		console.log("  📌 Object Methods:");
		for (const { object, name } of sources.objects) {
			console.log(
				`     ${colors.cyan}${object}${colors.reset}.${colors.blue}${name}${colors.reset}("...")`,
			);
			sourceStats.set(`object:${object}.${name}`, []);
		}
		console.log();
	}

	// Optimize: Move helper functions and selectors outside loops
	const addTranslation = (node: any, sourceKey: string) => {
		const printed = print(node);
		const text = printed.substring(1, printed.length - 1);
		const key = keyOf(text);

		// Track which source extracted this translation
		if (!translations[key]) {
			const stats = sourceStats.get(sourceKey) || [];
			stats.push(text);
			sourceStats.set(sourceKey, stats);
		}

		translations[key] = {
			ref: text,
			value: text,
		};
	};

	const literalSelector = "StringLiteral, NoSubstitutionTemplateLiteral";
	const jsxLiteralSelector =
		"StringLiteral, JsxExpression NoSubstitutionTemplateLiteral";

	// Pre-compile JSX selectors (individual for tracking)
	const jsxSelectors = sources.jsx.map(({ name, attr }) => ({
		selector: `JsxSelfClosingElement[tagName.name=${name}] JsxAttribute[name.name=${attr}], JsxOpeningElement[tagName.name=${name}] JsxAttribute[name.name=${attr}]`,
		sourceKey: `jsx:${name}.${attr}`,
	}));

	// Pre-compile selector for component prop defaults (individual for tracking)
	const propDefaultSelectors = sources.jsx.map(({ name, attr }) => ({
		selector: `VariableDeclaration:has(Identifier[name=${name}]) Parameter ObjectBindingPattern BindingElement:has(Identifier[name=${attr}])`,
		sourceKey: `jsx:${name}.${attr}`,
	}));

	// Build selectors for function calls (individual for tracking)
	// Match direct arguments, ConditionalExpression (ternary), BinaryExpression (nullish coalescing, logical operators)
	const functionSelectors = sources.functions.map(({ name }) => ({
		selector: `CallExpression:has(Identifier[name=${name}]) > StringLiteral, CallExpression:has(Identifier[name=${name}]) > NoSubstitutionTemplateLiteral, CallExpression:has(Identifier[name=${name}]) > ConditionalExpression StringLiteral, CallExpression:has(Identifier[name=${name}]) > ConditionalExpression NoSubstitutionTemplateLiteral, CallExpression:has(Identifier[name=${name}]) > ParenthesizedExpression StringLiteral, CallExpression:has(Identifier[name=${name}]) > ParenthesizedExpression NoSubstitutionTemplateLiteral, CallExpression:has(Identifier[name=${name}]) > BinaryExpression StringLiteral, CallExpression:has(Identifier[name=${name}]) > BinaryExpression NoSubstitutionTemplateLiteral`,
		sourceKey: `function:${name}`,
	}));

	// Build selectors for object method calls (individual for tracking)
	const objectSelectors = sources.objects.map(({ object, name }) => ({
		selector: `CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > StringLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > NoSubstitutionTemplateLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > ConditionalExpression StringLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > ConditionalExpression NoSubstitutionTemplateLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > ParenthesizedExpression StringLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > ParenthesizedExpression NoSubstitutionTemplateLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > BinaryExpression StringLiteral, CallExpression:has(PropertyAccessExpression:has(Identifier[name=${object}]):has(Identifier[name=${name}])) > BinaryExpression NoSubstitutionTemplateLiteral`,
		sourceKey: `object:${object}.${name}`,
	}));

	packages.forEach((path) => {
		const sourceFiles = project(`${path}/tsconfig.json`).filter((source) =>
			filter.test(source.fileName),
		);
		const total = sourceFiles.length;

		console.log(`\n📦 Package: ${colors.cyan}${path}${colors.reset}`);
		console.log(
			`📄 Files to process: ${colors.bold}${colors.yellow}${total}${colors.reset}\n`,
		);

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
			sourceFiles.forEach((source, index) => {
				files++;
				progressBar.update(index + 1, {
					file: source.fileName.split("/").pop(),
				});

				// Extract from JSX elements
				for (const { selector, sourceKey } of jsxSelectors) {
					query(source, selector).forEach((attr) => {
						query(attr, jsxLiteralSelector).forEach((node) => {
							addTranslation(node, sourceKey);
						});
					});
				}

				// Extract from component prop defaults
				for (const { selector, sourceKey } of propDefaultSelectors) {
					query(source, selector).forEach((binding) => {
						query(binding, literalSelector).forEach((node) => {
							addTranslation(node, sourceKey);
						});
					});
				}

				// Extract from function calls
				for (const { selector, sourceKey } of functionSelectors) {
					query(source, selector).forEach((node) => {
						addTranslation(node, sourceKey);
					});
				}

				// Extract from object method calls
				for (const { selector, sourceKey } of objectSelectors) {
					query(source, selector).forEach((node) => {
						addTranslation(node, sourceKey);
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

	// Display statistics per source
	console.log("📊 Extraction Statistics:\n");

	if (sources.jsx.length > 0) {
		console.log("  JSX Components:");
		// Calculate max width for alignment
		const maxWidth = Math.max(
			...sources.jsx.map(
				({ name, attr }) => `<${name} ${attr}="..." />`.length,
			),
		);

		for (const { name, attr } of sources.jsx) {
			const translations = sourceStats.get(`jsx:${name}.${attr}`) || [];
			const count = translations.length;
			const suffix = count === 1 ? "translation" : "translations";
			const plainText = `<${name} ${attr}="..." />`;
			const padding = " ".repeat(maxWidth - plainText.length);

			if (count === 0) {
				console.log(
					`     ${colors.dim}${plainText}${padding} → ${count} ${suffix}${colors.reset}`,
				);
			} else {
				const coloredText = `<${colors.cyan}${name}${colors.reset} ${colors.green}${attr}${colors.reset}="..." />`;
				console.log(
					`     ${coloredText}${padding} → ${colors.bold}${colors.yellow}${count}${colors.reset} ${suffix}`,
				);
				// Show the actual translations
				for (const translation of translations) {
					const truncated =
						translation.length > JSX_DISPLAY_LENGTH
							? `${translation.substring(0, JSX_DISPLAY_LENGTH - 3)}${colors.dim}...${colors.brightCyan}`
							: translation;
					console.log(
						`       ${colors.dim}"${colors.brightCyan}${truncated}${colors.reset}${colors.dim}"${colors.reset}`,
					);
				}
			}
		}
		console.log();
	}

	if (sources.functions.length > 0) {
		console.log("  Functions:");
		// Calculate max width for alignment
		const maxWidth = Math.max(
			...sources.functions.map(({ name }) => `${name}("...")`.length),
		);

		for (const { name } of sources.functions) {
			const translations = sourceStats.get(`function:${name}`) || [];
			const count = translations.length;
			const suffix = count === 1 ? "translation" : "translations";
			const plainText = `${name}("...")`;
			const padding = " ".repeat(maxWidth - plainText.length);

			if (count === 0) {
				console.log(
					`     ${colors.dim}${plainText}${padding} → ${count} ${suffix}${colors.reset}`,
				);
			} else {
				const coloredText = `${colors.blue}${name}${colors.reset}("...")`;
				console.log(
					`     ${coloredText}${padding} → ${colors.bold}${colors.yellow}${count}${colors.reset} ${suffix}`,
				);
				// Show the actual translations
				for (const translation of translations) {
					const truncated =
						translation.length > FUNCTION_DISPLAY_LENGTH
							? `${translation.substring(0, FUNCTION_DISPLAY_LENGTH - 3)}${colors.dim}...${colors.brightCyan}`
							: translation;
					console.log(
						`       ${colors.dim}"${colors.brightCyan}${truncated}${colors.reset}${colors.dim}"${colors.reset}`,
					);
				}
			}
		}
		console.log();
	}

	if (sources.objects.length > 0) {
		console.log("  Object Methods:");
		// Calculate max width for alignment
		const maxWidth = Math.max(
			...sources.objects.map(
				({ object, name }) => `${object}.${name}("...")`.length,
			),
		);

		for (const { object, name } of sources.objects) {
			const translations =
				sourceStats.get(`object:${object}.${name}`) || [];
			const count = translations.length;
			const suffix = count === 1 ? "translation" : "translations";
			const plainText = `${object}.${name}("...")`;
			const padding = " ".repeat(maxWidth - plainText.length);

			if (count === 0) {
				console.log(
					`     ${colors.dim}${plainText}${padding} → ${count} ${suffix}${colors.reset}`,
				);
			} else {
				const coloredText = `${colors.cyan}${object}${colors.reset}.${colors.blue}${name}${colors.reset}("...")`;
				console.log(
					`     ${coloredText}${padding} → ${colors.bold}${colors.yellow}${count}${colors.reset} ${suffix}`,
				);
				// Show the actual translations
				for (const translation of translations) {
					const truncated =
						translation.length > OBJECT_DISPLAY_LENGTH
							? `${translation.substring(0, OBJECT_DISPLAY_LENGTH - 3)}${colors.dim}...${colors.brightCyan}`
							: translation;
					console.log(
						`       ${colors.dim}"${colors.brightCyan}${truncated}${colors.reset}${colors.dim}"${colors.reset}`,
					);
				}
			}
		}
		console.log();
	}

	console.log(
		`📝 Writing translations to ${colors.bold}${colors.yellow}${locales.length}${colors.reset} locale(s)...\n`,
	);

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

		const filename = target.split("/").pop();
		const dirPath = target.substring(0, target.lastIndexOf("/") + 1);
		console.log(`  📄 ${dirPath}${colors.green}${filename}${colors.reset}`);
	});

	const translationCount = Object.keys(translations).length;
	console.log(
		`\n✨ Found ${colors.bold}${colors.yellow}${translationCount}${colors.reset} translations across ${colors.bold}${colors.yellow}${files}${colors.reset} files\n`,
	);
};
