import { build } from '@leight/esbuild';

await build({
    entryPoints: ['src/server.ts'],
    bundle:      false,
    format:      'cjs',
    outdir:      'bin',
});
