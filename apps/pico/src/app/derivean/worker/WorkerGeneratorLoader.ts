import { wrap } from "comlink";

export const WorkerGeneratorLoader = wrap<
	typeof import("./WorkerGenerator.ts")
>(
	new Worker(new URL("./WorkerGenerator.ts", import.meta.url), {
		type: "module",
	}),
);
