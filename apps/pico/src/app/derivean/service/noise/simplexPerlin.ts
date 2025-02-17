import { perlin } from "~/app/derivean/service/noise/perlin";
import { simplex } from "~/app/derivean/service/noise/simplex";

export const simplexPerlin = (seed: string) => {
	const $simplex = simplex(`${seed}-simplex`);
	const $perlin = perlin(`${seed}-perlin`);

	return (x: number, z: number) => {
		return $simplex(x, z) * 0.7 + $perlin(x, z) * 0.3;
	};
};
