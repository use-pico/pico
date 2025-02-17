export namespace warp {
	export interface Props {
		offsetX?: number;
		offsetZ?: number;
		noise(x: number, z: number): number;
	}
}

export const warp = ({ offsetX = 100, offsetZ = 0, noise }: warp.Props) => {
	return (x: number, z: number) => {
		const warpX = noise(x * 0.1 + offsetX, z * 0.1 + offsetX) * 2.0;
		const warpZ = noise(x * 0.1 + offsetZ, z * 0.1 + offsetZ) * 2.0;
		return noise(x + warpX, z + warpZ);
	};
};
