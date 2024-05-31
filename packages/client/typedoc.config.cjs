/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    entryPoints: [
        './src/index.ts',
    ],
    excludeNotDocumented: true,
    excludeInternal: true,
    excludePrivate: true,
    includeVersion: true,
    groupOrder: [
        'Properties',
        'Variables',
        'Functions',
        '*',
    ],
};
