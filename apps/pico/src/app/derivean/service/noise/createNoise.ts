import { FastNoiseLite, toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";

export namespace createNoise {
	export interface Props {
		seed: string;
	}
}

export const createNoise = ({ seed }: createNoise.Props) => {
	const rng = new XORWow(toSeed(seed));
	const noise = new FastNoiseLite(rng.float());

	noise.SetFrequency(1);
    
	return noise;
};
