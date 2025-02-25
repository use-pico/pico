import { FastNoiseLite, toSeed } from "@use-pico/common";
import { XORWow } from "random-seedable";
import type { Noise } from "~/app/derivean/service/noise/Noise";

export namespace createNoise {
	export interface Props {
		seed: string;
		frequency?: number;
		type?: FastNoiseLite.$NoiseType;
		domain?: {
			type: FastNoiseLite.$DomainWarpType;
			amp?: number;
		};
		fractal?: {
			type: FastNoiseLite.$FractalType;
			octaves?: number;
			lacunarity?: number;
			gain?: number;
			pingPongStrength?: number;
			weightedStrength?: number;
		};
		/**
		 * If provided, automatically switches to cellular noise.
		 */
		cellular?: {
			distanceFunction?: FastNoiseLite.$CellularDistanceFunction;
			returnType?: FastNoiseLite.$CellularReturnType;
		};
	}
}

export const createNoise = ({
	seed,
	type = FastNoiseLite.NoiseType.Perlin,
	frequency = 1,
	domain,
	fractal,
	cellular,
}: createNoise.Props): Noise => {
	const rng = new XORWow(toSeed(seed));
	const noise = new FastNoiseLite(rng.float());

	noise.SetNoiseType(type);
	noise.SetFrequency(frequency);

	if (domain) {
		noise.SetDomainWarpType(domain.type);
		domain.amp !== undefined && noise.SetDomainWarpAmp(domain.amp);
	}
	if (fractal) {
		noise.SetFractalType(fractal.type);
		fractal.octaves !== undefined && noise.SetFractalOctaves(fractal.octaves);
		fractal.gain !== undefined && noise.SetFractalGain(fractal.gain);
		fractal.lacunarity !== undefined &&
			noise.SetFractalLacunarity(fractal.lacunarity);
		fractal.pingPongStrength !== undefined &&
			noise.SetFractalPingPongStrength(fractal.pingPongStrength);
		fractal.weightedStrength !== undefined &&
			noise.SetFractalWeightedStrength(fractal.weightedStrength);
	}
	if (cellular) {
		noise.SetNoiseType(FastNoiseLite.NoiseType.Cellular);
		cellular.distanceFunction &&
			noise.SetCellularDistanceFunction(cellular.distanceFunction);
		cellular.returnType && noise.SetCellularReturnType(cellular.returnType);
	}

	return (x, z) => noise.GetNoise(x, z);
};
