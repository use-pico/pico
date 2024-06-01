import {
    includes,
    match,
    print,
    project,
    query
}         from "@phenomnomnominal/tsquery";
import {
    diffOf,
    keyOf,
    Timer
}         from "@use-pico/common";
import fs from "node:fs";
import {
    parse,
    stringify
}         from "yaml";

export namespace withTx {
    export interface Props {
        packages: string[];
        output: string;
        locales: string[];
    }
}

export const withTx = (
    {
        packages,
        output,
        locales,
    }: withTx.Props,
) => {
    const translations: Record<string, {
        ref: string,
        value: string,
    }> = {};

    packages.forEach(path => {
        const benchmark = Timer.benchmark(() => {
            console.log(`Searching in [${path}/tsconfig.json]`);
            project(`${path}/tsconfig.json`)
                .filter(source => !source.fileName.endsWith(".d.ts"))
                .forEach(source => {
                    query(source, "TaggedTemplateExpression")
                        .filter(node => includes(node, "Identifier[name=t]") || includes(node, "Identifier[name=tx]"))
                        .forEach(node => {
                            match(node, "NoSubstitutionTemplateLiteral").forEach(node => {
                                const source = print(node);
                                const text = source.substring(1, source.length - 1);
                                translations[keyOf(text)] = {
                                    ref:   text,
                                    value: text,
                                };
                            });
                        });
                });
        });
        console.log(benchmark.format(`Package [${packages}] search time %s.%ms s`));
    });

    fs.mkdirSync(output, {recursive: true});

    const benchmark = Timer.benchmark(() => {
        locales.forEach(locale => {
            const target = `${output}/${locale}.yaml`;

            console.log(`Writing locale [${locale}] to [${target}]`);

            let current: Record<string, any> = {};
            try {
                current = parse(fs.readFileSync(target, {encoding: "utf-8"})) as Record<string, any>;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                // Noop
            }

            /**
             * Delete dead keys
             */
            for (const key of diffOf(Object.keys(current), Object.keys(translations))) {
                delete current[key];
            }

            fs.writeFileSync(target, stringify(
                new Map(Object.entries({
                    ...translations,
                    ...current,
                }).sort())
            ), {
                encoding: "utf-8",
            });
        });
    });

    console.log(`Number of found translations: ${Object.keys(translations).length}`);

    console.log(benchmark.format("Exported in %s.%ms s"));
};
