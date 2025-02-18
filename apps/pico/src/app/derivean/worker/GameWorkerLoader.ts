import { wrap } from "comlink";
import type {
    GameWorker
} from "~/app/derivean/worker/GameWorker";

export const GameWorkerLoader = wrap<GameWorker>(
	new Worker(new URL("./GameWorker.ts", import.meta.url), {
		type: "module",
	}),
);
