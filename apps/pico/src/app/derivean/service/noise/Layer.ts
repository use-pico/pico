import type { Noise } from "~/app/derivean/service/noise/Noise";

export interface Layer {
	noise: Noise;
	scale: number;
	weight: number;
}
