import { id } from "@use-pico/common";
import type { PlaygroundType } from "~/app/playground/PlaygroundType";

export const PlaygroundItems: PlaygroundType[] = Array.from(
	{ length: 30 },
	() => ({
		id: id(),
		bar: id(),
		foo: id(),
	}),
);
