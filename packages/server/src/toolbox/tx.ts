import { match, print, project, query } from "@phenomnomnominal/tsquery";
import { diffOf, keyOf, Timer, type TranslationSchema } from "@use-pico/common";
import fs from "node:fs";
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
	}
}

export const tx = ({ packages, output, locales }: tx.Props) => {
	const translations: tx.Translations = {};

	packages.forEach((path) => {
		const benchmark = Timer.benchmark(() => {
			project(`${path}/tsconfig.json`)
				.filter((source) => !source.fileName.endsWith(".d.ts"))
				.forEach((source) => {
					query(source, "JsxSelfClosingElement > Identifier[name=Tx]").forEach(
						(node) => {
							match(
								node.parent,
								"JsxAttribute > Identifier[name=label]",
							).forEach((node) => {
								match(node.parent, "StringLiteral").forEach((node) => {
									const source = print(node);
									const text = source.substring(1, source.length - 1);
									translations[keyOf(text)] = {
										ref: text,
										value: text,
									};
								});
							});
						},
					);

					query(
						source,
						"CallExpression > PropertyAccessExpression > Identifier[name=translator]",
					).forEach((node) => {
						match(node.parent.parent, "StringLiteral").forEach((node) => {
							const source = print(node);
							const text = source.substring(1, source.length - 1);
							translations[keyOf(text)] = {
								ref: text,
								value: text,
							};
						});
					});
				});
		});
		console.log(benchmark.format(`Package [${packages}] search time %s.%ms s`));
	});

	fs.mkdirSync(output, { recursive: true });

	const benchmark = Timer.benchmark(() => {
		locales.forEach((locale) => {
			const target = `${output}/${locale}.yaml`;

			console.log(`Writing locale [${locale}] to [${target}]`);

			let current: Record<string, TranslationSchema.Type> = {};
			try {
				current = parse(
					fs.readFileSync(target, { encoding: "utf-8" }),
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

			fs.writeFileSync(
				target,
				stringify(
					new Map(
						Object.entries({
							...translations,
							...current,
						}).sort(),
					),
				),
				{
					encoding: "utf-8",
				},
			);
		});
	});

	console.log(
		`Number of found translations: ${Object.keys(translations).length}`,
	);

	console.log(benchmark.format("Exported in %s.%ms s"));
};
