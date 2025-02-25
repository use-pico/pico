/**
 * Some predefined chunk cache limits.
 *
 * Also keep in mind that low numbers may kill some chunks required on the screen, e.g.
 * renderer needs 64 chunks, but you have only 32 set on the cache.
 *
 * Be *extremely careful* with this value, as this has direct impact on (huge) memory usage.
 */
export type ChunkLimit = 128 | 256 | 512 | 1024 | 2048;
