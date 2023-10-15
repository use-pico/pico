import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle:      true,
    target:      [
        'es2022'
    ],
    platform:    'node',
    format:      'esm',
    sourcemap:   true,
    outdir:      'lib',
    packages:    'external',
});
