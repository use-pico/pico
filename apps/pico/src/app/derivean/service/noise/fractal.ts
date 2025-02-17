export namespace fractal {
	export interface Props {
		octaves?: number;
		persistence?: number;
		lacunarity?: number;
		noise(x: number, z: number): number;
	}
}

export const fractal = ({
	octaves = 4,
	persistence = 0.5,
	lacunarity = 2.0,
	noise,
}: fractal.Props) => {
	return (x: number, z: number) => {
		let total = 0;
		let amplitude = 1;
		let frequency = 1;
		let maxValue = 0;

		for (let i = 0; i < octaves; i++) {
			total += noise(x * frequency, z * frequency) * amplitude;
			maxValue += amplitude;
			amplitude *= persistence;
			frequency *= lacunarity;
		}
		return total / maxValue;
	};
};
