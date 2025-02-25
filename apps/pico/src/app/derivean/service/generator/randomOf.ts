import { toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";

export namespace randomOf {
	export interface Props {
		x: number;
		z: number;
		seed: string;
	}
}

export const randomOf = ({ x, z, seed }: randomOf.Props) => {
	return new XORWow(toSeed(`${seed}-${x}:${z}`)).float();
};
