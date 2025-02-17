import { createNoise } from "~/app/derivean/service/noise/createNoise";

export const perlin = (seed: string) => {
	const noise = createNoise({ seed });

	return (x: number, z: number) => {
		return noise.perlin2(x, z);
	};
};
