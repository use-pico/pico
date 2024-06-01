/** @type {import("typedoc").TypeDocOptions} */
module.exports = {
    name: "@use-pico",
    entryPoints: [
        "./packages/*",
    ],
    entryPointStrategy: "packages",
    includeVersion: true,
    out: "docs",
    plugin: [
        // 'typedoc-material-theme',
        // 'typedoc-plugin-mdn-links',
        // 'typedoc-plugin-inline-sources',
        // 'typedoc-plugin-zod',
        // 'typedoc-plugin-coverage',
    ],
    visibilityFilters: {
        inherited: true,
    },
    packageOptions: {
        entryPoints: [
            "./src/index.ts",
        ],
        excludeNotDocumented: true,
        excludeInternal: true,
        excludePrivate: true,
        includeVersion: true,
        excludeExternals: true,
        categorizeByGroup: true,
        sort: [
            "required-first",
            "kind",
        ],
        groupOrder: [
            "ui",
            "query",
            "*",
        ],
        // kindSortOrder: [
        //     "Variable",
        //     "Function",
        //     "Interface",
        //     "Namespace",
        // ],
    },
};
