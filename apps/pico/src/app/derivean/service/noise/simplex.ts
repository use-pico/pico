import { createNoise } from "~/app/derivean/service/noise/createNoise";

export const simplex = (seed: string) => {
	const noise = createNoise({ seed });

	return (x: number, z: number) => {
		return noise.simplex2(x, z);
	};
};
