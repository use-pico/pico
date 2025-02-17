const plotSize = 16;
const plotCount = 256;
const chunkSize = plotCount * plotSize;

/**
 * Because game is sensitive to various pre-defined sizes, they must be shared.
 */
export const Game = { plotSize, plotCount, chunkSize } as const;
