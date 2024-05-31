/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    entryPoints: [
        './packages/client',
        './packages/common',
        './packages/server',
    ],
    entryPointStrategy: 'packages',
    out: 'docs',
    plugin: [
        'typedoc-material-theme',
        'typedoc-plugin-mdn-links',
        'typedoc-plugin-inline-sources',
        'typedoc-plugin-zod',
        'typedoc-plugin-coverage',
    ],
    themeColor: '#3f51b5',
};
