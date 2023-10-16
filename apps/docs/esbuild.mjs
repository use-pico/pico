import { build } from '@use-pico/esbuild';

await build({
    entryPoints: ['src/server.ts'],
    bundle:      false,
    format:      'cjs',
    outdir:      'bin',
});
