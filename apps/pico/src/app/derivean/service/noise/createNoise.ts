import { toSeed } from "@use-pico/common";
import CoolNoise from "noisejs";
import { XORWow } from "random-seedable";

const { Noise } = CoolNoise as unknown as {
	Noise: new (seed: number) => CoolNoise;
};

export namespace createNoise {
	export interface Props {
		seed: string;
	}
}

export const createNoise = ({ seed }: createNoise.Props) => {
	const rng = new XORWow(toSeed(seed));
	return new Noise(rng.float());
};
