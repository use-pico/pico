import type { Noise } from "~/app/derivean/type/Noise";

export interface Layer {
	noise: Noise;
	scale: number;
	weight: number;
}
