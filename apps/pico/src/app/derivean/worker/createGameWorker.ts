import { wrap } from "comlink";
import type { GameWorker } from "~/app/derivean/worker/GameWorker";

export const createGameWorker = () => {
	const worker = new Worker(new URL("./GameWorker.ts", import.meta.url), {
		type: "module",
	});

	return {
		worker,
		proxy: wrap<GameWorker>(worker),
	} as const;
};
