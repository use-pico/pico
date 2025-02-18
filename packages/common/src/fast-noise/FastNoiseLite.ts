import { CellularDistanceFunction } from "./CellularDistanceFunction";
import { CellularReturnType } from "./CellularReturnType";
import { DomainWarpType } from "./DomainWarpType";
import { FractalType } from "./FractalType";
import { Gradients2D } from "./Gradients2D";
import { Gradients3D } from "./Gradients3D";
import { NoiseType } from "./NoiseType";
import { PrimeX } from "./PrimeX";
import { PrimeY } from "./PrimeY";
import { PrimeZ } from "./PrimeZ";
import { RandVecs2D } from "./RandVecs2D";
import { RandVecs3D } from "./RandVecs3D";
import { RotationType3D } from "./RotationType3D";
import { TransformType3D } from "./TransformType3D";
import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";
import { withCubicLerp } from "./withCubicLerp";
import { withGradCoordR2 } from "./withGradCoordR2";
import { withGradCoordR3 } from "./withGradCoordR3";
import { withHashR2 } from "./withHashR2";
import { withHashR3 } from "./withHashR3";
import { withInterpHermite } from "./withInterpHermite";
import { withInterpQuintic } from "./withInterpQuintic";
import { withLerp } from "./withLerp";
import { withPingPong } from "./withPingPong";
import { withSinglePerlinR2 } from "./withSinglePerlinR2";
import { withValCoordR2 } from "./withValCoordR2";
import { withValCoordR3 } from "./withValCoordR3";

export class FastNoiseLite {
	/* Private */
	_Seed: number;
	_Frequency = 0.01;
	_NoiseType: NoiseType = NoiseType.OpenSimplex2;
	_RotationType3D: RotationType3D = RotationType3D.None;
	_TransformType3D: TransformType3D = TransformType3D.DefaultOpenSimplex2;
	_DomainWarpAmp = 1.0;

	_FractalType: FractalType = FractalType.None;
	_Octaves = 3;
	_Lacunarity = 2.0;
	_Gain = 0.5;
	_WeightedStrength = 0.0;
	_PingPongStrength = 2.0;

	_FractalBounding = 1 / 1.75;

	_CellularDistanceFunction: CellularDistanceFunction =
		CellularDistanceFunction.EuclideanSq;
	_CellularReturnType: CellularReturnType = CellularReturnType.Distance;
	_CellularJitterModifier = 1.0;

	_DomainWarpType: DomainWarpType = DomainWarpType.OpenSimplex2;
	_WarpTransformType3D: TransformType3D = TransformType3D.DefaultOpenSimplex2;

	/* Statics */
	static NoiseType = NoiseType;
	static FractalType = FractalType;
	static CellularDistanceFunction = CellularDistanceFunction;
	static CellularReturnType = CellularReturnType;
	static DomainWarpType = DomainWarpType;

	/**
	 * @description Create new FastNoiseLite object with optional seed
	 * @param {number} [seed]
	 * @constructor
	 */
	constructor(seed: number) {
		this._Seed = seed;
	}

	/**
	 * @description Sets frequency for all noise types
	 * @remarks Default: 0.01
	 * @default 0.01
	 * @param {number} frequency
	 */
	SetFrequency(frequency: number) {
		this._Frequency = frequency;
	}

	/**
	 * @description Sets noise algorithm used for GetNoise(...)
	 * @remarks Default: OpenSimplex2
	 * @default FastNoiseLite.NoiseType.OpenSimplex2
	 * @param {FastNoiseLite.NoiseType} noiseType
	 */
	SetNoiseType(noiseType: NoiseType) {
		this._NoiseType = noiseType;
		this._UpdateTransformType3D();
	}

	/**
	 * @description Sets domain rotation type for 3D Noise and 3D DomainWarp.
	 * @description Can aid in reducing directional artifacts when sampling a 2D plane in 3D
	 * @remarks Default: None
	 * @default FastNoiseLite.RotationType3D.None
	 * @param {FastNoiseLite.RotationType3D} rotationType3D
	 */
	SetRotationType3D(rotationType3D: RotationType3D) {
		this._RotationType3D = rotationType3D;
		this._UpdateTransformType3D();
		this._UpdateWarpTransformType3D();
	}

	/**
	 * @description Sets method for combining octaves in all fractal noise types
	 * @remarks Default: None
	 * @default FastNoiseLite.FractalType.None
	 * @param {FastNoiseLite.FractalType} fractalType
	 */
	SetFractalType(fractalType: FractalType) {
		this._FractalType = fractalType;
	}

	/**
	 * @description Sets octave count for all fractal noise types
	 * @remarks Default: 3
	 * @default 3
	 * @param {number} octaves
	 */
	SetFractalOctaves(octaves: number) {
		this._Octaves = octaves;
		this._CalculateFractalBounding();
	}

	/**
	 * @description Sets octave lacunarity for all fractal noise types
	 * @remarks Default: 2.0
	 * @default 2.0
	 * @param {number} lacunarity
	 */
	SetFractalLacunarity(lacunarity: number) {
		this._Lacunarity = lacunarity;
	}

	/**
	 * @description Sets octave gain for all fractal noise types
	 * @remarks Default: 0.5
	 * @default 0.5
	 * @param {number} gain
	 */
	SetFractalGain(gain: number) {
		this._Gain = gain;
		this._CalculateFractalBounding();
	}

	/**
	 * @description Sets octave weighting for all none DomainWarp fratal types
	 * @remarks Default: 0.0 | Keep between 0...1 to maintain -1...1 output bounding
	 * @default 0.5
	 * @param {number} weightedStrength
	 */
	SetFractalWeightedStrength(weightedStrength: number) {
		this._WeightedStrength = weightedStrength;
	}

	/**
	 * @description Sets strength of the fractal ping pong effect
	 * @remarks Default: 2.0
	 * @default 2.0
	 * @param {number} pingPongStrength
	 */
	SetFractalPingPongStrength(pingPongStrength: number) {
		this._PingPongStrength = pingPongStrength;
	}

	/**
	 * @description Sets distance function used in cellular noise calculations
	 * @remarks Default: EuclideanSq
	 * @default FastNoiseLite.CellularDistanceFunction.EuclideanSq
	 * @param {FastNoiseLite.CellularDistanceFunction} cellularDistanceFunction
	 */
	SetCellularDistanceFunction(
		cellularDistanceFunction: CellularDistanceFunction,
	) {
		this._CellularDistanceFunction = cellularDistanceFunction;
	}

	/**
	 * @description Sets return type from cellular noise calculations
	 * @remarks Default: Distance
	 * @default FastNoiseLite.CellularReturnType.Distance
	 * @param {FastNoiseLite.CellularReturnType} cellularReturnType
	 */
	SetCellularReturnType(cellularReturnType: CellularReturnType) {
		this._CellularReturnType = cellularReturnType;
	}

	/**
	 * @description Sets the maximum distance a cellular point can move from it's grid position
	 * @remarks Default: 1.0
	 * @default 1.0
	 * @param {number} cellularJitter
	 */
	SetCellularJitter(cellularJitter: number) {
		this._CellularJitterModifier = cellularJitter;
	}

	/**
	 * @description Sets the warp algorithm when using DomainWarp(...)
	 * @remarks Default: OpenSimplex2
	 * @default FastNoiseLite.DomainWarpType.OpenSimplex2
	 * @param {FastNoiseLite.DomainWarpType} domainWarpType
	 */
	SetDomainWarpType(domainWarpType: DomainWarpType) {
		this._DomainWarpType = domainWarpType;
		this._UpdateWarpTransformType3D();
	}

	/**
	 * @description Sets the maximum warp distance from original position when using DomainWarp(...)
	 * @remarks Default: 1.0
	 * @default 1.0
	 * @param {number} domainWarpAmp
	 */
	SetDomainWarpAmp(domainWarpAmp: number) {
		this._DomainWarpAmp = domainWarpAmp;
	}

	/**
	 * @description 2D/3D noise at given position using current settings
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * @param {number} [z] Z coordinate
	 * @return {number} Noise output bounded between -1...1
	 */
	GetNoise(x: number, y: number, z?: number): number {
		/**
		 * @description 2D noise at given position using current settings
		 * @param {number} x
		 * @param {number} y
		 * @return {number} Noise output bounded between -1...1
		 */
		const R2 = (x: number, y: number): number => {
			x *= this._Frequency;
			y *= this._Frequency;

			switch (this._NoiseType) {
				case NoiseType.OpenSimplex2:
				case NoiseType.OpenSimplex2S: {
					const SQRT3 = 1.7320508075688772935274463415059;
					const F2 = 0.5 * (SQRT3 - 1);
					const t = (x + y) * F2;
					x += t;
					y += t;
					break;
				}
				default:
					break;
			}

			switch (this._FractalType) {
				case FractalType.FBm:
					return this._GenFractalFBmR2(x, y);
				case FractalType.Ridged:
					return this._GenFractalRidgedR2(x, y);
				case FractalType.PingPong:
					return this._GenFractalPingPongR2(x, y);
				default:
					return this._GenNoiseSingleR2(this._Seed, x, y);
			}
		};

		/**
		 * @description 3D noise at given position using current settings
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 * @return {number} Noise output bounded between -1...1
		 */
		const R3 = (x: number, y: number, z: number): number => {
			x *= this._Frequency;
			y *= this._Frequency;
			z *= this._Frequency;

			switch (this._TransformType3D) {
				case TransformType3D.ImproveXYPlanes: {
					const xy = x + y;
					const s2 = xy * -0.211324865405187;
					z *= 0.577350269189626;
					x += s2 - z;
					y += s2 - z;
					z += xy * 0.577350269189626;
					break;
				}
				case TransformType3D.ImproveXZPlanes: {
					const xz = x + z;
					const s2 = xz * -0.211324865405187;
					y *= 0.577350269189626;
					x += s2 - y;
					z += s2 - y;
					y += xz * 0.577350269189626;
					break;
				}
				case TransformType3D.DefaultOpenSimplex2: {
					const R3 = 2.0 / 3.0;
					const r = (x + y + z) * R3;
					x = r - x;
					y = r - y;
					z = r - z;
					break;
				}
				default:
					break;
			}

			switch (this._FractalType) {
				case FractalType.FBm:
					return this._GenFractalFBmR3(x, y, z);
				case FractalType.Ridged:
					return this._GenFractalRidgedR3(x, y, z);
				case FractalType.PingPong:
					return this._GenFractalPingPongR3(x, y, z);
				default:
					return this._GenNoiseSingleR3(this._Seed, x, y, z);
			}
		};

		if (arguments.length === 2) {
			return R2(x, y);
		}

		if (arguments.length === 3 && z !== undefined) {
			return R3(x, y, z);
		}

		return 0;
	}

	/**
	 * @description 2D/3D warps the input position using current domain warp settings
	 * @param {Vector2|Vector3} coord
	 */
	DomainWrap(coord: Vector2 | Vector3) {
		switch (this._FractalType) {
			case FractalType.DomainWarpProgressive:
				this._DomainWarpFractalProgressive(coord);
				break;
			case FractalType.DomainWarpIndependent:
				this._DomainWarpFractalIndependent(coord);
				break;
			default:
				this._DomainWarpSingle(coord);
				break;
		}
	}

	/**
	 * @private
	 */
	_CalculateFractalBounding() {
		const gain = Math.abs(this._Gain);
		let amp = gain;
		let ampFractal = 1.0;
		for (let i = 1; i < this._Octaves; i++) {
			ampFractal += amp;
			amp *= gain;
		}
		this._FractalBounding = 1 / ampFractal;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_GenNoiseSingleR2(seed: number, x: number, y: number): number {
		switch (this._NoiseType) {
			case NoiseType.OpenSimplex2:
				return this._SingleOpenSimplex2R2(seed, x, y);
			case NoiseType.OpenSimplex2S:
				return this._SingleOpenSimplex2SR2(seed, x, y);
			case NoiseType.Cellular:
				return this._SingleCellularR2(seed, x, y);
			case NoiseType.Perlin:
				return withSinglePerlinR2(seed, x, y);
			case NoiseType.ValueCubic:
				return this._SingleValueCubicR2(seed, x, y);
			case NoiseType.Value:
				return this._SingleValueR2(seed, x, y);
			default:
				return 0;
		}
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_GenNoiseSingleR3(seed: number, x: number, y: number, z: number): number {
		switch (this._NoiseType) {
			case NoiseType.OpenSimplex2:
				return this._SingleOpenSimplex2R3(seed, x, y, z);
			case NoiseType.OpenSimplex2S:
				return this._SingleOpenSimplex2SR3(seed, x, y, z);
			case NoiseType.Cellular:
				return this._SingleCellularR3(seed, x, y, z);
			case NoiseType.Perlin:
				return this._SinglePerlinR3(seed, x, y, z);
			case NoiseType.ValueCubic:
				return this._SingleValueCubicR3(seed, x, y, z);
			case NoiseType.Value:
				return this._SingleValueR3(seed, x, y, z);
			default:
				return 0;
		}
	}

	/**
	 * @private
	 */
	_UpdateTransformType3D() {
		switch (this._RotationType3D) {
			case RotationType3D.ImproveXYPlanes:
				this._TransformType3D = TransformType3D.ImproveXYPlanes;
				break;
			case RotationType3D.ImproveXZPlanes:
				this._TransformType3D = TransformType3D.ImproveXZPlanes;
				break;
			default:
				switch (this._NoiseType) {
					case NoiseType.OpenSimplex2:
					case NoiseType.OpenSimplex2S:
						this._TransformType3D = TransformType3D.DefaultOpenSimplex2;
						break;
					default:
						this._TransformType3D = TransformType3D.None;
						break;
				}
				break;
		}
	}

	/**
	 * @private
	 */
	_UpdateWarpTransformType3D() {
		switch (this._RotationType3D) {
			case RotationType3D.ImproveXYPlanes:
				this._WarpTransformType3D = TransformType3D.ImproveXYPlanes;
				break;
			case RotationType3D.ImproveXZPlanes:
				this._WarpTransformType3D = TransformType3D.ImproveXZPlanes;
				break;
			default:
				switch (this._DomainWarpType) {
					case DomainWarpType.OpenSimplex2:
					case DomainWarpType.OpenSimplex2Reduced:
						this._WarpTransformType3D = TransformType3D.DefaultOpenSimplex2;
						break;
					default:
						this._WarpTransformType3D = TransformType3D.None;
						break;
				}
				break;
		}
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_GenFractalFBmR2(x: number, y: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = this._GenNoiseSingleR2(seed++, x, y);
			sum += noise * amp;
			amp *= withLerp(
				1.0,
				Math.min(noise + 1, 2) * 0.5,
				this._WeightedStrength,
			);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_GenFractalFBmR3(x: number, y: number, z: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = this._GenNoiseSingleR3(seed++, x, y, z);
			sum += noise * amp;
			amp *= withLerp(1.0, (noise + 1) * 0.5, this._WeightedStrength);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			z *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_GenFractalRidgedR2(x: number, y: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = Math.abs(this._GenNoiseSingleR2(seed++, x, y));
			sum += (noise * -2 + 1) * amp;
			amp *= withLerp(1.0, 1 - noise, this._WeightedStrength);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_GenFractalRidgedR3(x: number, y: number, z: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = Math.abs(this._GenNoiseSingleR3(seed++, x, y, z));
			sum += (noise * -2 + 1) * amp;
			amp *= withLerp(1.0, 1 - noise, this._WeightedStrength);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			z *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_GenFractalPingPongR2(x: number, y: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = withPingPong(
				(this._GenNoiseSingleR2(seed++, x, y) + 1) * this._PingPongStrength,
			);
			sum += (noise - 0.5) * 2 * amp;
			amp *= withLerp(1.0, noise, this._WeightedStrength);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 * @private
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_GenFractalPingPongR3(x: number, y: number, z: number): number {
		let seed = this._Seed;
		let sum = 0;
		let amp = this._FractalBounding;

		for (let i = 0; i < this._Octaves; i++) {
			const noise = withPingPong(
				(this._GenNoiseSingleR3(seed++, x, y, z) + 1) * this._PingPongStrength,
			);
			sum += (noise - 0.5) * 2 * amp;
			amp *= withLerp(1.0, noise, this._WeightedStrength);

			x *= this._Lacunarity;
			y *= this._Lacunarity;
			z *= this._Lacunarity;
			amp *= this._Gain;
		}
		return sum;
	}

	/**
	 *
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_SingleOpenSimplex2R2(seed: number, x: number, y: number): number {
		const SQRT3 = 1.7320508075688772935274463415059;
		const G2 = (3 - SQRT3) / 6;

		let i = Math.floor(x);
		let j = Math.floor(y);
		const xi = x - i;
		const yi = y - j;

		const t = (xi + yi) * G2;
		const x0 = xi - t;
		const y0 = yi - t;

		i = Math.imul(i, PrimeX);
		j = Math.imul(j, PrimeY);

		let n0, n1, n2;

		const a = 0.5 - x0 * x0 - y0 * y0;

		if (a <= 0) {
			n0 = 0;
		} else {
			n0 = a * a * (a * a) * withGradCoordR2(seed, i, j, x0, y0);
		}

		const c =
			2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
			(-2 * (1 - 2 * G2) * (1 - 2 * G2) + a);

		if (c <= 0) {
			n2 = 0;
		} else {
			const x2 = x0 + (2 * G2 - 1);
			const y2 = y0 + (2 * G2 - 1);
			n2 =
				c * c * (c * c) * withGradCoordR2(seed, i + PrimeX, j + PrimeY, x2, y2);
		}

		if (y0 > x0) {
			const x1 = x0 + G2;
			const y1 = y0 + (G2 - 1);
			const b = 0.5 - x1 * x1 - y1 * y1;
			if (b <= 0) {
				n1 = 0;
			} else {
				n1 = b * b * (b * b) * withGradCoordR2(seed, i, j + PrimeY, x1, y1);
			}
		} else {
			const x1 = x0 + (G2 - 1);
			const y1 = y0 + G2;
			const b = 0.5 - x1 * x1 - y1 * y1;
			if (b <= 0) {
				n1 = 0;
			} else {
				n1 = b * b * (b * b) * withGradCoordR2(seed, i + PrimeX, j, x1, y1);
			}
		}
		return (n0 + n1 + n2) * 99.83685446303647;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SingleOpenSimplex2R3(seed: number, x: number, y: number, z: number): number {
		let i = Math.round(x);
		let j = Math.round(y);
		let k = Math.round(z);
		let x0 = x - i;
		let y0 = y - j;
		let z0 = z - k;

		let yNSign = Math.trunc((-1.0 - y0) | 1);
		let xNSign = Math.trunc((-1.0 - x0) | 1);
		let zNSign = Math.trunc((-1.0 - z0) | 1);

		let ax0 = xNSign * -x0;
		let ay0 = yNSign * -y0;
		let az0 = zNSign * -z0;
		i = Math.imul(i, PrimeX);
		j = Math.imul(j, PrimeY);
		k = Math.imul(k, PrimeZ);

		let value = 0;
		let a = 0.6 - x0 * x0 - (y0 * y0 + z0 * z0);

		for (let l = 0; ; l++) {
			if (a > 0) {
				value += a * a * (a * a) * withGradCoordR3(seed, i, j, k, x0, y0, z0);
			}

			if (ax0 >= ay0 && ax0 >= az0) {
				let b = a + ax0 + ax0;
				if (b > 1) {
					b -= 1;
					value +=
						b *
						b *
						(b * b) *
						withGradCoordR3(
							seed,
							i - xNSign * PrimeX,
							j,
							k,
							x0 + xNSign,
							y0,
							z0,
						);
				}
			} else if (ay0 > ax0 && ay0 >= az0) {
				let b = a + ay0 + ay0;
				if (b > 1) {
					b -= 1;
					value +=
						b *
						b *
						(b * b) *
						withGradCoordR3(
							seed,
							i,
							j - yNSign * PrimeY,
							k,
							x0,
							y0 + yNSign,
							z0,
						);
				}
			} else {
				let b = a + az0 + az0;
				if (b > 1) {
					b -= 1;
					value +=
						b *
						b *
						(b * b) *
						withGradCoordR3(
							seed,
							i,
							j,
							k - zNSign * PrimeZ,
							x0,
							y0,
							z0 + zNSign,
						);
				}
			}

			if (l === 1) {
				break;
			}

			ax0 = 0.5 - ax0;
			ay0 = 0.5 - ay0;
			az0 = 0.5 - az0;

			x0 = xNSign * ax0;
			y0 = yNSign * ay0;
			z0 = zNSign * az0;

			a += 0.75 - ax0 - (ay0 + az0);

			i += (xNSign >> 1) & PrimeX;
			j += (yNSign >> 1) & PrimeY;
			k += (zNSign >> 1) & PrimeZ;

			xNSign = -xNSign;
			yNSign = -yNSign;
			zNSign = -zNSign;

			seed = ~seed;
		}
		return value * 32.69428253173828125;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_SingleOpenSimplex2SR2(seed: number, x: number, y: number): number {
		// 2D OpenSimplex2S case is a modified 2D simplex noise.

		const SQRT3 = 1.7320508075688772935274463415059;
		const G2 = (3 - SQRT3) / 6;

		/*
		 * --- Skew moved to TransformNoiseCoordinate method ---
		 * final FNLfloat F2 = 0.5f * (SQRT3 - 1);
		 * FNLfloat s = (x + y) * F2;
		 * x += s; y += s;
		 */

		let i = Math.floor(x);
		let j = Math.floor(y);
		const xi = x - i;
		const yi = y - j;

		i = Math.imul(i, PrimeX);
		j = Math.imul(j, PrimeY);
		const i1 = i + PrimeX;
		const j1 = j + PrimeY;

		const t = (xi + yi) * G2;
		const x0 = xi - t;
		const y0 = yi - t;

		const a0 = 2.0 / 3.0 - x0 * x0 - y0 * y0;
		let value = a0 * a0 * (a0 * a0) * withGradCoordR2(seed, i, j, x0, y0);
		const a1 =
			2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
			(-2 * (1 - 2 * G2) * (1 - 2 * G2) + a0);
		const x1 = x0 - (1 - 2 * G2);
		const y1 = y0 - (1 - 2 * G2);
		value += a1 * a1 * (a1 * a1) * withGradCoordR2(seed, i1, j1, x1, y1);

		// Nested conditionals were faster than compact bit logic/arithmetic.
		const xmyi = xi - yi;
		if (t > G2) {
			if (xi + xmyi > 1) {
				const x2 = x0 + (3 * G2 - 2);
				const y2 = y0 + (3 * G2 - 1);
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 *
						a2 *
						(a2 * a2) *
						withGradCoordR2(seed, i + (PrimeX << 1), j + PrimeY, x2, y2);
				}
			} else {
				const x2 = x0 + G2;
				const y2 = y0 + (G2 - 1);
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 * a2 * (a2 * a2) * withGradCoordR2(seed, i, j + PrimeY, x2, y2);
				}
			}

			if (yi - xmyi > 1) {
				const x3 = x0 + (3 * G2 - 1);
				const y3 = y0 + (3 * G2 - 2);
				const a3 = 2.0 / 3.0 - x3 * x3 - y3 * y3;
				if (a3 > 0) {
					value +=
						a3 *
						a3 *
						(a3 * a3) *
						withGradCoordR2(seed, i + PrimeX, j + (PrimeY << 1), x3, y3);
				}
			} else {
				const x3 = x0 + (G2 - 1);
				const y3 = y0 + G2;
				const a3 = 2.0 / 3.0 - x3 * x3 - y3 * y3;
				if (a3 > 0) {
					value +=
						a3 * a3 * (a3 * a3) * withGradCoordR2(seed, i + PrimeX, j, x3, y3);
				}
			}
		} else {
			if (xi + xmyi < 0) {
				const x2 = x0 + (1 - G2);
				const y2 = y0 - G2;
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 * a2 * (a2 * a2) * withGradCoordR2(seed, i - PrimeX, j, x2, y2);
				}
			} else {
				const x2 = x0 + (G2 - 1);
				const y2 = y0 + G2;
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 * a2 * (a2 * a2) * withGradCoordR2(seed, i + PrimeX, j, x2, y2);
				}
			}

			if (yi < xmyi) {
				const x2 = x0 - G2;
				const y2 = y0 - (G2 - 1);
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 * a2 * (a2 * a2) * withGradCoordR2(seed, i, j - PrimeY, x2, y2);
				}
			} else {
				const x2 = x0 + G2;
				const y2 = y0 + (G2 - 1);
				const a2 = 2.0 / 3.0 - x2 * x2 - y2 * y2;
				if (a2 > 0) {
					value +=
						a2 * a2 * (a2 * a2) * withGradCoordR2(seed, i, j + PrimeY, x2, y2);
				}
			}
		}

		return value * 18.24196194486065;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SingleOpenSimplex2SR3(
		seed: number,
		x: number,
		y: number,
		z: number,
	): number {
		// 3D OpenSimplex2S case uses two offset rotated cube grids.

		/*
		 * --- Rotation moved to TransformNoiseCoordinate method ---
		 * final FNLfloat R3 = (FNLfloat)(2.0 / 3.0);
		 * FNLfloat r = (x + y + z) * R3; // Rotation, not skew
		 * x = r - x; y = r - y; z = r - z;
		 */

		let i = Math.floor(x);
		let j = Math.floor(y);
		let k = Math.floor(z);
		const xi = x - i;
		const yi = y - j;
		const zi = z - k;

		i = Math.imul(i, PrimeX);
		j = Math.imul(j, PrimeY);
		k = Math.imul(k, PrimeZ);
		const seed2 = seed + 1293373;

		const xNMask = Math.trunc(-0.5 - xi);
		const yNMask = Math.trunc(-0.5 - yi);
		const zNMask = Math.trunc(-0.5 - zi);

		const x0 = xi + xNMask;
		const y0 = yi + yNMask;
		const z0 = zi + zNMask;
		const a0 = 0.75 - x0 * x0 - y0 * y0 - z0 * z0;
		let value =
			a0 *
			a0 *
			(a0 * a0) *
			withGradCoordR3(
				seed,
				i + (xNMask & PrimeX),
				j + (yNMask & PrimeY),
				k + (zNMask & PrimeZ),
				x0,
				y0,
				z0,
			);

		const x1 = xi - 0.5;
		const y1 = yi - 0.5;
		const z1 = zi - 0.5;
		const a1 = 0.75 - x1 * x1 - y1 * y1 - z1 * z1;
		value +=
			a1 *
			a1 *
			(a1 * a1) *
			withGradCoordR3(seed2, i + PrimeX, j + PrimeY, k + PrimeZ, x1, y1, z1);

		const xAFlipMask0 = ((xNMask | 1) << 1) * x1;
		const yAFlipMask0 = ((yNMask | 1) << 1) * y1;
		const zAFlipMask0 = ((zNMask | 1) << 1) * z1;
		const xAFlipMask1 = (-2 - (xNMask << 2)) * x1 - 1.0;
		const yAFlipMask1 = (-2 - (yNMask << 2)) * y1 - 1.0;
		const zAFlipMask1 = (-2 - (zNMask << 2)) * z1 - 1.0;

		let skip5 = false;
		const a2 = xAFlipMask0 + a0;
		if (a2 > 0) {
			const x2 = x0 - (xNMask | 1);
			value +=
				a2 *
				a2 *
				(a2 * a2) *
				withGradCoordR3(
					seed,
					i + (~xNMask & PrimeX),
					j + (yNMask & PrimeY),
					k + (zNMask & PrimeZ),
					x2,
					y0,
					z0,
				);
		} else {
			const a3 = yAFlipMask0 + zAFlipMask0 + a0;

			if (a3 > 0) {
				const x3 = x0;
				const y3 = y0 - (yNMask | 1);
				const z3 = z0 - (zNMask | 1);
				value +=
					a3 *
					a3 *
					(a3 * a3) *
					withGradCoordR3(
						seed,
						i + (xNMask & PrimeX),
						j + (~yNMask & PrimeY),
						k + (~zNMask & PrimeZ),
						x3,
						y3,
						z3,
					);
			}

			const a4 = xAFlipMask1 + a1;
			if (a4 > 0) {
				const x4 = (xNMask | 1) + x1;
				value +=
					a4 *
					a4 *
					(a4 * a4) *
					withGradCoordR3(
						seed2,
						i + (xNMask & (PrimeX * 2)),
						j + PrimeY,
						k + PrimeZ,
						x4,
						y1,
						z1,
					);
				skip5 = true;
			}
		}

		let skip9 = false;
		const a6 = yAFlipMask0 + a0;
		if (a6 > 0) {
			const x6 = x0;
			const y6 = y0 - (yNMask | 1);
			value +=
				a6 *
				a6 *
				(a6 * a6) *
				withGradCoordR3(
					seed,
					i + (xNMask & PrimeX),
					j + (~yNMask & PrimeY),
					k + (zNMask & PrimeZ),
					x6,
					y6,
					z0,
				);
		} else {
			const a7 = xAFlipMask0 + zAFlipMask0 + a0;
			if (a7 > 0) {
				const x7 = x0 - (xNMask | 1);
				const y7 = y0;
				const z7 = z0 - (zNMask | 1);
				value +=
					a7 *
					a7 *
					(a7 * a7) *
					withGradCoordR3(
						seed,
						i + (~xNMask & PrimeX),
						j + (yNMask & PrimeY),
						k + (~zNMask & PrimeZ),
						x7,
						y7,
						z7,
					);
			}

			const a8 = yAFlipMask1 + a1;
			if (a8 > 0) {
				const x8 = x1;
				const y8 = (yNMask | 1) + y1;
				value +=
					a8 *
					a8 *
					(a8 * a8) *
					withGradCoordR3(
						seed2,
						i + PrimeX,
						j + (yNMask & (PrimeY << 1)),
						k + PrimeZ,
						x8,
						y8,
						z1,
					);
				skip9 = true;
			}
		}

		let skipD = false;
		const aA = zAFlipMask0 + a0;
		if (aA > 0) {
			const xA = x0;
			const yA = y0;
			const zA = z0 - (zNMask | 1);
			value +=
				aA *
				aA *
				(aA * aA) *
				withGradCoordR3(
					seed,
					i + (xNMask & PrimeX),
					j + (yNMask & PrimeY),
					k + (~zNMask & PrimeZ),
					xA,
					yA,
					zA,
				);
		} else {
			const aB = xAFlipMask0 + yAFlipMask0 + a0;
			if (aB > 0) {
				const xB = x0 - (xNMask | 1);
				const yB = y0 - (yNMask | 1);
				value +=
					aB *
					aB *
					(aB * aB) *
					withGradCoordR3(
						seed,
						i + (~xNMask & PrimeX),
						j + (~yNMask & PrimeY),
						k + (zNMask & PrimeZ),
						xB,
						yB,
						z0,
					);
			}

			const aC = zAFlipMask1 + a1;
			if (aC > 0) {
				const xC = x1;
				const yC = y1;
				const zC = (zNMask | 1) + z1;
				value +=
					aC *
					aC *
					(aC * aC) *
					withGradCoordR3(
						seed2,
						i + PrimeX,
						j + PrimeY,
						k + (zNMask & (PrimeZ << 1)),
						xC,
						yC,
						zC,
					);
				skipD = true;
			}
		}

		if (!skip5) {
			const a5 = yAFlipMask1 + zAFlipMask1 + a1;
			if (a5 > 0) {
				const x5 = x1;
				const y5 = (yNMask | 1) + y1;
				const z5 = (zNMask | 1) + z1;
				value +=
					a5 *
					a5 *
					(a5 * a5) *
					withGradCoordR3(
						seed2,
						i + PrimeX,
						j + (yNMask & (PrimeY << 1)),
						k + (zNMask & (PrimeZ << 1)),
						x5,
						y5,
						z5,
					);
			}
		}

		if (!skip9) {
			const a9 = xAFlipMask1 + zAFlipMask1 + a1;
			if (a9 > 0) {
				const x9 = (xNMask | 1) + x1;
				const y9 = y1;
				const z9 = (zNMask | 1) + z1;
				value +=
					a9 *
					a9 *
					(a9 * a9) *
					withGradCoordR3(
						seed2,
						i + (xNMask & (PrimeX * 2)),
						j + PrimeY,
						k + (zNMask & (PrimeZ << 1)),
						x9,
						y9,
						z9,
					);
			}
		}

		if (!skipD) {
			const aD = xAFlipMask1 + yAFlipMask1 + a1;
			if (aD > 0) {
				const xD = (xNMask | 1) + x1;
				const yD = (yNMask | 1) + y1;
				value +=
					aD *
					aD *
					(aD * aD) *
					withGradCoordR3(
						seed2,
						i + (xNMask & (PrimeX << 1)),
						j + (yNMask & (PrimeY << 1)),
						k + PrimeZ,
						xD,
						yD,
						z1,
					);
			}
		}

		return value * 9.046026385208288;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_SingleCellularR2(seed: number, x: number, y: number): number {
		/**
		 *
		 * @param {number} seed
		 * @param {number} x
		 * @param {number} y
		 * @returns {number}
		 */
		const xr = Math.round(x);
		const yr = Math.round(y);

		let distance0 = Number.MAX_VALUE;
		let distance1 = Number.MAX_VALUE;

		let closestHash = 0;

		const cellularJitter = 0.43701595 * this._CellularJitterModifier;

		let xPrimed = (xr - 1) * PrimeX;
		const yPrimedBase = (yr - 1) * PrimeY;

		switch (this._CellularDistanceFunction) {
			default:
			case CellularDistanceFunction.Euclidean:
			case CellularDistanceFunction.EuclideanSq:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						const hash = withHashR2(seed, xPrimed, yPrimed);
						const idx = hash & (255 << 1);

						const vecX = xi - x + RandVecs2D[idx]! * cellularJitter;
						const vecY = yi - y + RandVecs2D[idx | 1]! * cellularJitter;

						const newDistance = vecX * vecX + vecY * vecY;

						distance1 = Math.max(Math.min(distance1, newDistance), distance0);
						if (newDistance < distance0) {
							distance0 = newDistance;
							closestHash = hash;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
			case CellularDistanceFunction.Manhattan:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						const hash = withHashR2(seed, xPrimed, yPrimed);
						const idx = hash & (255 << 1);

						const vecX = xi - x + RandVecs2D[idx]! * cellularJitter;
						const vecY = yi - y + RandVecs2D[idx | 1]! * cellularJitter;

						const newDistance = Math.abs(vecX) + Math.abs(vecY);

						distance1 = Math.max(Math.min(distance1, newDistance), distance0);
						if (newDistance < distance0) {
							distance0 = newDistance;
							closestHash = hash;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
			case CellularDistanceFunction.Hybrid:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						const hash = withHashR2(seed, xPrimed, yPrimed);
						const idx = hash & (255 << 1);

						const vecX = xi - x + RandVecs2D[idx]! * cellularJitter;
						const vecY = yi - y + RandVecs2D[idx | 1]! * cellularJitter;

						const newDistance =
							Math.abs(vecX) + Math.abs(vecY) + (vecX * vecX + vecY * vecY);

						distance1 = Math.max(Math.min(distance1, newDistance), distance0);
						if (newDistance < distance0) {
							distance0 = newDistance;
							closestHash = hash;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
		}

		if (
			this._CellularDistanceFunction === CellularDistanceFunction.Euclidean &&
			this._CellularReturnType !== CellularReturnType.CellValue
		) {
			distance0 = Math.sqrt(distance0);
			distance1 = Math.sqrt(distance1);
		}

		switch (this._CellularReturnType) {
			case CellularReturnType.CellValue:
				return closestHash * (1 / 2147483648.0);
			case CellularReturnType.Distance:
				return distance0 - 1;
			case CellularReturnType.Distance2:
				return distance1 - 1;
			case CellularReturnType.Distance2Add:
				return (distance1 + distance0) * 0.5 - 1;
			case CellularReturnType.Distance2Sub:
				return distance1 - distance0 - 1;
			case CellularReturnType.Distance2Mul:
				return distance1 * distance0 * 0.5 - 1;
			case CellularReturnType.Distance2Div:
				return distance0 / distance1 - 1;
			default:
				return 0;
		}
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SingleCellularR3(seed: number, x: number, y: number, z: number): number {
		const xr = Math.round(x);
		const yr = Math.round(y);
		const zr = Math.round(z);

		let distance0 = Number.MAX_VALUE;
		let distance1 = Number.MAX_VALUE;
		let closestHash = 0;

		const cellularJitter = 0.39614353 * this._CellularJitterModifier;

		let xPrimed = (xr - 1) * PrimeX;
		const yPrimedBase = (yr - 1) * PrimeY;
		const zPrimedBase = (zr - 1) * PrimeZ;

		switch (this._CellularDistanceFunction) {
			case CellularDistanceFunction.Euclidean:
			case CellularDistanceFunction.EuclideanSq:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						let zPrimed = zPrimedBase;

						for (let zi = zr - 1; zi <= zr + 1; zi++) {
							const hash = withHashR3(seed, xPrimed, yPrimed, zPrimed);
							const idx = hash & (255 << 2);

							const vecX = xi - x + RandVecs3D[idx]! * cellularJitter;
							const vecY = yi - y + RandVecs3D[idx | 1]! * cellularJitter;
							const vecZ = zi - z + RandVecs3D[idx | 2]! * cellularJitter;

							const newDistance = vecX * vecX + vecY * vecY + vecZ * vecZ;

							distance1 = Math.max(Math.min(distance1, newDistance), distance0);
							if (newDistance < distance0) {
								distance0 = newDistance;
								closestHash = hash;
							}
							zPrimed += PrimeZ;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
			case CellularDistanceFunction.Manhattan:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						let zPrimed = zPrimedBase;

						for (let zi = zr - 1; zi <= zr + 1; zi++) {
							const hash = withHashR3(seed, xPrimed, yPrimed, zPrimed);
							const idx = hash & (255 << 2);

							const vecX = xi - x + RandVecs3D[idx]! * cellularJitter;
							const vecY = yi - y + RandVecs3D[idx | 1]! * cellularJitter;
							const vecZ = zi - z + RandVecs3D[idx | 2]! * cellularJitter;

							const newDistance =
								Math.abs(vecX) + Math.abs(vecY) + Math.abs(vecZ);

							distance1 = Math.max(Math.min(distance1, newDistance), distance0);
							if (newDistance < distance0) {
								distance0 = newDistance;
								closestHash = hash;
							}
							zPrimed += PrimeZ;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
			case CellularDistanceFunction.Hybrid:
				for (let xi = xr - 1; xi <= xr + 1; xi++) {
					let yPrimed = yPrimedBase;

					for (let yi = yr - 1; yi <= yr + 1; yi++) {
						let zPrimed = zPrimedBase;

						for (let zi = zr - 1; zi <= zr + 1; zi++) {
							const hash = withHashR3(seed, xPrimed, yPrimed, zPrimed);
							const idx = hash & (255 << 2);

							const vecX = xi - x + RandVecs3D[idx]! * cellularJitter;
							const vecY = yi - y + RandVecs3D[idx | 1]! * cellularJitter;
							const vecZ = zi - z + RandVecs3D[idx | 2]! * cellularJitter;

							const newDistance =
								Math.abs(vecX) +
								Math.abs(vecY) +
								Math.abs(vecZ) +
								(vecX * vecX + vecY * vecY + vecZ * vecZ);

							distance1 = Math.max(Math.min(distance1, newDistance), distance0);
							if (newDistance < distance0) {
								distance0 = newDistance;
								closestHash = hash;
							}
							zPrimed += PrimeZ;
						}
						yPrimed += PrimeY;
					}
					xPrimed += PrimeX;
				}
				break;
			default:
				break;
		}

		if (
			this._CellularDistanceFunction === CellularDistanceFunction.Euclidean &&
			this._CellularReturnType !== CellularReturnType.CellValue
		) {
			distance0 = Math.sqrt(distance0);
			distance1 = Math.sqrt(distance1);
		}

		switch (this._CellularReturnType) {
			case CellularReturnType.CellValue:
				return closestHash * (1 / 2147483648.0);
			case CellularReturnType.Distance:
				return distance0 - 1;
			case CellularReturnType.Distance2:
				return distance1 - 1;
			case CellularReturnType.Distance2Add:
				return (distance1 + distance0) * 0.5 - 1;
			case CellularReturnType.Distance2Sub:
				return distance1 - distance0 - 1;
			case CellularReturnType.Distance2Mul:
				return distance1 * distance0 * 0.5 - 1;
			case CellularReturnType.Distance2Div:
				return distance0 / distance1 - 1;
			default:
				return 0;
		}
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SinglePerlinR3(seed: number, x: number, y: number, z: number): number {
		let x0 = Math.floor(x);
		let y0 = Math.floor(y);
		let z0 = Math.floor(z);

		const xd0 = x - x0;
		const yd0 = y - y0;
		const zd0 = z - z0;
		const xd1 = xd0 - 1;
		const yd1 = yd0 - 1;
		const zd1 = zd0 - 1;

		const xs = withInterpQuintic(xd0);
		const ys = withInterpQuintic(yd0);
		const zs = withInterpQuintic(zd0);

		x0 = Math.imul(x0, PrimeX);
		y0 = Math.imul(y0, PrimeY);
		z0 = Math.imul(z0, PrimeZ);
		const x1 = x0 + PrimeX;
		const y1 = y0 + PrimeY;
		const z1 = z0 + PrimeZ;

		const xf00 = withLerp(
			withGradCoordR3(seed, x0, y0, z0, xd0, yd0, zd0),
			withGradCoordR3(seed, x1, y0, z0, xd1, yd0, zd0),
			xs,
		);
		const xf10 = withLerp(
			withGradCoordR3(seed, x0, y1, z0, xd0, yd1, zd0),
			withGradCoordR3(seed, x1, y1, z0, xd1, yd1, zd0),
			xs,
		);
		const xf01 = withLerp(
			withGradCoordR3(seed, x0, y0, z1, xd0, yd0, zd1),
			withGradCoordR3(seed, x1, y0, z1, xd1, yd0, zd1),
			xs,
		);
		const xf11 = withLerp(
			withGradCoordR3(seed, x0, y1, z1, xd0, yd1, zd1),
			withGradCoordR3(seed, x1, y1, z1, xd1, yd1, zd1),
			xs,
		);

		const yf0 = withLerp(xf00, xf10, ys);
		const yf1 = withLerp(xf01, xf11, ys);

		return withLerp(yf0, yf1, zs) * 0.964921414852142333984375;
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_SingleValueCubicR2(seed: number, x: number, y: number): number {
		let x1 = Math.floor(x);
		let y1 = Math.floor(y);

		const xs = x - x1;
		const ys = y - y1;

		x1 = Math.imul(x1, PrimeX);
		y1 = Math.imul(y1, PrimeY);
		const x0 = x1 - PrimeX;
		const y0 = y1 - PrimeY;
		const x2 = x1 + PrimeX;
		const y2 = y1 + PrimeY;
		const x3 = x1 + (PrimeX << 1);
		const y3 = y1 + (PrimeY << 1);

		return (
			withCubicLerp(
				withCubicLerp(
					withValCoordR2(seed, x0, y0),
					withValCoordR2(seed, x1, y0),
					withValCoordR2(seed, x2, y0),
					withValCoordR2(seed, x3, y0),
					xs,
				),
				withCubicLerp(
					withValCoordR2(seed, x0, y1),
					withValCoordR2(seed, x1, y1),
					withValCoordR2(seed, x2, y1),
					withValCoordR2(seed, x3, y1),
					xs,
				),
				withCubicLerp(
					withValCoordR2(seed, x0, y2),
					withValCoordR2(seed, x1, y2),
					withValCoordR2(seed, x2, y2),
					withValCoordR2(seed, x3, y2),
					xs,
				),
				withCubicLerp(
					withValCoordR2(seed, x0, y3),
					withValCoordR2(seed, x1, y3),
					withValCoordR2(seed, x2, y3),
					withValCoordR2(seed, x3, y3),
					xs,
				),
				ys,
			) *
			(1 / (1.5 * 1.5))
		);
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SingleValueCubicR3(seed: number, x: number, y: number, z: number): number {
		let x1 = Math.floor(x);
		let y1 = Math.floor(y);
		let z1 = Math.floor(z);

		const xs = x - x1;
		const ys = y - y1;
		const zs = z - z1;

		x1 = Math.imul(x1, PrimeX);
		y1 = Math.imul(y1, PrimeY);
		z1 = Math.imul(z1, PrimeZ);

		const x0 = x1 - PrimeX;
		const y0 = y1 - PrimeY;
		const z0 = z1 - PrimeZ;
		const x2 = x1 + PrimeX;
		const y2 = y1 + PrimeY;
		const z2 = z1 + PrimeZ;
		const x3 = x1 + (PrimeX << 1);
		const y3 = y1 + (PrimeY << 1);
		const z3 = z1 + (PrimeZ << 1);

		return (
			withCubicLerp(
				withCubicLerp(
					withCubicLerp(
						withValCoordR3(seed, x0, y0, z0),
						withValCoordR3(seed, x1, y0, z0),
						withValCoordR3(seed, x2, y0, z0),
						withValCoordR3(seed, x3, y0, z0),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y1, z0),
						withValCoordR3(seed, x1, y1, z0),
						withValCoordR3(seed, x2, y1, z0),
						withValCoordR3(seed, x3, y1, z0),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y2, z0),
						withValCoordR3(seed, x1, y2, z0),
						withValCoordR3(seed, x2, y2, z0),
						withValCoordR3(seed, x3, y2, z0),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y3, z0),
						withValCoordR3(seed, x1, y3, z0),
						withValCoordR3(seed, x2, y3, z0),
						withValCoordR3(seed, x3, y3, z0),
						xs,
					),
					ys,
				),
				withCubicLerp(
					withCubicLerp(
						withValCoordR3(seed, x0, y0, z1),
						withValCoordR3(seed, x1, y0, z1),
						withValCoordR3(seed, x2, y0, z1),
						withValCoordR3(seed, x3, y0, z1),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y1, z1),
						withValCoordR3(seed, x1, y1, z1),
						withValCoordR3(seed, x2, y1, z1),
						withValCoordR3(seed, x3, y1, z1),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y2, z1),
						withValCoordR3(seed, x1, y2, z1),
						withValCoordR3(seed, x2, y2, z1),
						withValCoordR3(seed, x3, y2, z1),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y3, z1),
						withValCoordR3(seed, x1, y3, z1),
						withValCoordR3(seed, x2, y3, z1),
						withValCoordR3(seed, x3, y3, z1),
						xs,
					),
					ys,
				),
				withCubicLerp(
					withCubicLerp(
						withValCoordR3(seed, x0, y0, z2),
						withValCoordR3(seed, x1, y0, z2),
						withValCoordR3(seed, x2, y0, z2),
						withValCoordR3(seed, x3, y0, z2),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y1, z2),
						withValCoordR3(seed, x1, y1, z2),
						withValCoordR3(seed, x2, y1, z2),
						withValCoordR3(seed, x3, y1, z2),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y2, z2),
						withValCoordR3(seed, x1, y2, z2),
						withValCoordR3(seed, x2, y2, z2),
						withValCoordR3(seed, x3, y2, z2),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y3, z2),
						withValCoordR3(seed, x1, y3, z2),
						withValCoordR3(seed, x2, y3, z2),
						withValCoordR3(seed, x3, y3, z2),
						xs,
					),
					ys,
				),
				withCubicLerp(
					withCubicLerp(
						withValCoordR3(seed, x0, y0, z3),
						withValCoordR3(seed, x1, y0, z3),
						withValCoordR3(seed, x2, y0, z3),
						withValCoordR3(seed, x3, y0, z3),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y1, z3),
						withValCoordR3(seed, x1, y1, z3),
						withValCoordR3(seed, x2, y1, z3),
						withValCoordR3(seed, x3, y1, z3),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y2, z3),
						withValCoordR3(seed, x1, y2, z3),
						withValCoordR3(seed, x2, y2, z3),
						withValCoordR3(seed, x3, y2, z3),
						xs,
					),
					withCubicLerp(
						withValCoordR3(seed, x0, y3, z3),
						withValCoordR3(seed, x1, y3, z3),
						withValCoordR3(seed, x2, y3, z3),
						withValCoordR3(seed, x3, y3, z3),
						xs,
					),
					ys,
				),
				zs,
			) *
			(1 / (1.5 * 1.5 * 1.5))
		);
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_SingleValueR2(seed: number, x: number, y: number): number {
		let x0 = Math.floor(x);
		let y0 = Math.floor(y);

		const xs = withInterpHermite(x - x0);
		const ys = withInterpHermite(y - y0);

		x0 = Math.imul(x0, PrimeX);
		y0 = Math.imul(y0, PrimeY);
		const x1 = x0 + PrimeX;
		const y1 = y0 + PrimeY;

		const xf0 = withLerp(
			withValCoordR2(seed, x0, y0),
			withValCoordR2(seed, x1, y0),
			xs,
		);
		const xf1 = withLerp(
			withValCoordR2(seed, x0, y1),
			withValCoordR2(seed, x1, y1),
			xs,
		);

		return withLerp(xf0, xf1, ys);
	}

	/**
	 * @private
	 * @param {number} seed
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {number}
	 */
	_SingleValueR3(seed: number, x: number, y: number, z: number): number {
		let x0 = Math.floor(x);
		let y0 = Math.floor(y);
		let z0 = Math.floor(z);

		const xs = withInterpHermite(x - x0);
		const ys = withInterpHermite(y - y0);
		const zs = withInterpHermite(z - z0);

		x0 = Math.imul(x0, PrimeX);
		y0 = Math.imul(y0, PrimeY);
		z0 = Math.imul(z0, PrimeZ);
		const x1 = x0 + PrimeX;
		const y1 = y0 + PrimeY;
		const z1 = z0 + PrimeZ;

		const xf00 = withLerp(
			withValCoordR3(seed, x0, y0, z0),
			withValCoordR3(seed, x1, y0, z0),
			xs,
		);
		const xf10 = withLerp(
			withValCoordR3(seed, x0, y1, z0),
			withValCoordR3(seed, x1, y1, z0),
			xs,
		);
		const xf01 = withLerp(
			withValCoordR3(seed, x0, y0, z1),
			withValCoordR3(seed, x1, y0, z1),
			xs,
		);
		const xf11 = withLerp(
			withValCoordR3(seed, x0, y1, z1),
			withValCoordR3(seed, x1, y1, z1),
			xs,
		);

		const yf0 = withLerp(xf00, xf10, ys);
		const yf1 = withLerp(xf01, xf11, ys);

		return withLerp(yf0, yf1, zs);
	}

	/**
	 * @private
	 */
	_DoSingleDomainWarp(
		seed: number,
		amp: number,
		freq: number,
		coord: Vector2 | Vector3,
		x: number,
		y: number,
		z?: number,
	) {
		/**
		 *
		 * @param {number} seed
		 * @param {number} amp
		 * @param {number} freq
		 * @param {Vector2} coord
		 * @param {number} x
		 * @param {number} y
		 */
		const R2 = (
			seed: number,
			amp: number,
			freq: number,
			coord: Vector2,
			x: number,
			y: number,
		) => {
			switch (this._DomainWarpType) {
				case DomainWarpType.OpenSimplex2:
					this._SingleDomainWarpOpenSimplex2Gradient(
						seed,
						amp * 38.283687591552734375,
						freq,
						coord,
						false,
						x,
						y,
					);
					break;
				case DomainWarpType.OpenSimplex2Reduced:
					this._SingleDomainWarpOpenSimplex2Gradient(
						seed,
						amp * 16.0,
						freq,
						coord,
						true,
						x,
						y,
					);
					break;
				case DomainWarpType.BasicGrid:
					this._SingleDomainWarpBasicGrid(seed, amp, freq, coord, x, y);
					break;
			}
		};

		/**
		 *
		 * @param {number} seed
		 * @param {number} amp
		 * @param {number} freq
		 * @param {Vector3} coord
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 */
		const R3 = (
			seed: number,
			amp: number,
			freq: number,
			coord: Vector3,
			x: number,
			y: number,
			z: number,
		) => {
			switch (this._DomainWarpType) {
				case DomainWarpType.OpenSimplex2:
					this._SingleDomainWarpOpenSimplex2Gradient(
						seed,
						amp * 32.69428253173828125,
						freq,
						coord,
						false,
						x,
						y,
						z,
					);
					break;
				case DomainWarpType.OpenSimplex2Reduced:
					this._SingleDomainWarpOpenSimplex2Gradient(
						seed,
						amp * 7.71604938271605,
						freq,
						coord,
						true,
						x,
						y,
						z,
					);
					break;
				case DomainWarpType.BasicGrid:
					this._SingleDomainWarpBasicGrid(seed, amp, freq, coord, x, y, z);
					break;
			}
		};

		if (coord instanceof Vector2) {
			return R2(seed, amp, freq, coord, x, y);
		}

		if (coord instanceof Vector3 && z !== undefined) {
			return R3(seed, amp, freq, coord, x, y, z);
		}
	}

	/**
	 * @private
	 */
	_DomainWarpSingle(coord: Vector2 | Vector3) {
		/**
		 *
		 * @param {Vector2} coord
		 */
		const R2 = (coord: Vector2) => {
			const seed = this._Seed;
			const amp = this._DomainWarpAmp * this._FractalBounding;
			const freq = this._Frequency;

			let xs = coord.x;
			let ys = coord.y;
			switch (this._DomainWarpType) {
				case DomainWarpType.OpenSimplex2:
				case DomainWarpType.OpenSimplex2Reduced: {
					const SQRT3 = 1.7320508075688772935274463415059;
					const F2 = 0.5 * (SQRT3 - 1);
					const t = (xs + ys) * F2;
					xs += t;
					ys += t;
					break;
				}
				default:
					break;
			}

			this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);
		};

		/**
		 *
		 * @param {Vector3} coord
		 */
		const R3 = (coord: Vector3) => {
			const seed = this._Seed;
			const amp = this._DomainWarpAmp * this._FractalBounding;
			const freq = this._Frequency;

			let xs = coord.x;
			let ys = coord.y;
			let zs = coord.z;
			switch (this._WarpTransformType3D) {
				case TransformType3D.ImproveXYPlanes:
					{
						const xy = xs + ys;
						const s2 = xy * -0.211324865405187;
						zs *= 0.577350269189626;
						xs += s2 - zs;
						ys = ys + s2 - zs;
						zs += xy * 0.577350269189626;
					}
					break;

				case TransformType3D.ImproveXZPlanes:
					{
						const xz = xs + zs;
						const s2 = xz * -0.211324865405187;
						ys *= 0.577350269189626;
						xs += s2 - ys;
						zs += s2 - ys;
						ys += xz * 0.577350269189626;
					}
					break;
				case TransformType3D.DefaultOpenSimplex2: {
					const R3 = 2.0 / 3.0;
					const r = (xs + ys + zs) * R3;
					xs = r - xs;
					ys = r - ys;
					zs = r - zs;
					break;
				}
				default:
					break;
			}

			this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);
		};

		if (coord instanceof Vector2) {
			return R2(coord);
		}

		if (coord instanceof Vector3) {
			return R3(coord);
		}
	}

	_DomainWarpFractalProgressive(coord: Vector2 | Vector3) {
		/**
		 *
		 * @param {Vector2} coord
		 */
		const R2 = (coord: Vector2) => {
			let seed = this._Seed;
			let amp = this._DomainWarpAmp * this._FractalBounding;
			let freq = this._Frequency;

			for (let i = 0; i < this._Octaves; i++) {
				let xs = coord.x;
				let ys = coord.y;
				switch (this._DomainWarpType) {
					case DomainWarpType.OpenSimplex2:
					case DomainWarpType.OpenSimplex2Reduced: {
						const SQRT3 = 1.7320508075688772935274463415059;
						const F2 = 0.5 * (SQRT3 - 1);
						const t = (xs + ys) * F2;
						xs += t;
						ys += t;
						break;
					}
					default:
						break;
				}

				this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);

				seed++;
				amp *= this._Gain;
				freq *= this._Lacunarity;
			}
		};

		/**
		 *
		 * @param {Vector3} coord
		 */
		const R3 = (coord: Vector3) => {
			let seed = this._Seed;
			let amp = this._DomainWarpAmp * this._FractalBounding;
			let freq = this._Frequency;

			for (let i = 0; i < this._Octaves; i++) {
				let xs = coord.x;
				let ys = coord.y;
				let zs = coord.z;
				switch (this._WarpTransformType3D) {
					case TransformType3D.ImproveXYPlanes:
						{
							const xy = xs + ys;
							const s2 = xy * -0.211324865405187;
							zs *= 0.577350269189626;
							xs += s2 - zs;
							ys = ys + s2 - zs;
							zs += xy * 0.577350269189626;
						}
						break;
					case TransformType3D.ImproveXZPlanes:
						{
							const xz = xs + zs;
							const s2 = xz * -0.211324865405187;
							ys *= 0.577350269189626;
							xs += s2 - ys;
							zs += s2 - ys;
							ys += xz * 0.577350269189626;
						}
						break;
					case TransformType3D.DefaultOpenSimplex2:
						{
							const R3 = 2.0 / 3.0;
							const r = (xs + ys + zs) * R3;
							xs = r - xs;
							ys = r - ys;
							zs = r - zs;
						}
						break;
					default:
						break;
				}

				this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);

				seed++;
				amp *= this._Gain;
				freq *= this._Lacunarity;
			}
		};

		if (coord instanceof Vector2) {
			return R2(coord);
		}

		if (coord instanceof Vector3) {
			return R3(coord);
		}
	}

	/**
	 * @private
	 */
	_DomainWarpFractalIndependent(coord: Vector2 | Vector3) {
		/**
		 *
		 * @param {Vector2} coord
		 */
		const R2 = (coord: Vector2) => {
			let xs = coord.x;
			let ys = coord.y;
			switch (this._DomainWarpType) {
				case DomainWarpType.OpenSimplex2:
				case DomainWarpType.OpenSimplex2Reduced: {
					const SQRT3 = 1.7320508075688772935274463415059;
					const F2 = 0.5 * (SQRT3 - 1);
					const t = (xs + ys) * F2;
					xs += t;
					ys += t;
					break;
				}
				default:
					break;
			}
			let seed = this._Seed;
			let amp = this._DomainWarpAmp * this._FractalBounding;
			let freq = this._Frequency;

			for (let i = 0; i < this._Octaves; i++) {
				this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys);

				seed++;
				amp *= this._Gain;
				freq *= this._Lacunarity;
			}
		};

		/**
		 *
		 * @param {Vector3} coord
		 */
		const R3 = (coord: Vector3) => {
			let xs = coord.x;
			let ys = coord.y;
			let zs = coord.z;
			switch (this._WarpTransformType3D) {
				case TransformType3D.ImproveXYPlanes:
					{
						const xy = xs + ys;
						const s2 = xy * -0.211324865405187;
						zs *= 0.577350269189626;
						xs += s2 - zs;
						ys = ys + s2 - zs;
						zs += xy * 0.577350269189626;
					}
					break;
				case TransformType3D.ImproveXZPlanes:
					{
						const xz = xs + zs;
						const s2 = xz * -0.211324865405187;
						ys *= 0.577350269189626;
						xs += s2 - ys;
						zs += s2 - ys;
						ys += xz * 0.577350269189626;
					}
					break;
				case TransformType3D.DefaultOpenSimplex2:
					{
						const R3 = 2.0 / 3.0;
						const r = (xs + ys + zs) * R3;
						xs = r - xs;
						ys = r - ys;
						zs = r - zs;
					}
					break;
				default:
					break;
			}

			let seed = this._Seed;
			let amp = this._DomainWarpAmp * this._FractalBounding;
			let freq = this._Frequency;
			for (let i = 0; i < this._Octaves; i++) {
				this._DoSingleDomainWarp(seed, amp, freq, coord, xs, ys, zs);

				seed++;
				amp *= this._Gain;
				freq *= this._Lacunarity;
			}
		};

		if (coord instanceof Vector2) {
			return R2(coord);
		}

		if (coord instanceof Vector3) {
			return R3(coord);
		}
	}

	/**
	 * @private
	 */
	_SingleDomainWarpBasicGrid(
		seed: number,
		warpAmp: number,
		frequency: number,
		coord: Vector2 | Vector3,
		x: number,
		y: number,
		z?: number,
	) {
		/**
		 *
		 * @param {number} seed
		 * @param {number} warpAmp
		 * @param {number} frequency
		 * @param {Vector2} coord
		 * @param {number} x
		 * @param {number} y
		 */

		const R2 = (
			seed: number,
			warpAmp: number,
			frequency: number,
			coord: Vector2,
			x: number,
			y: number,
		) => {
			const xf = x * frequency;
			const yf = y * frequency;

			let x0 = Math.floor(xf);
			let y0 = Math.floor(yf);

			const xs = withInterpHermite(xf - x0);
			const ys = withInterpHermite(yf - y0);

			x0 = Math.imul(x0, PrimeX);
			y0 = Math.imul(y0, PrimeY);
			const x1 = x0 + PrimeX;
			const y1 = y0 + PrimeY;

			let hash0 = withHashR2(seed, x0, y0) & (255 << 1);
			let hash1 = withHashR2(seed, x1, y0) & (255 << 1);

			const lx0x = withLerp(RandVecs2D[hash0]!, RandVecs2D[hash1]!, xs);
			const ly0x = withLerp(RandVecs2D[hash0 | 1]!, RandVecs2D[hash1 | 1]!, xs);

			hash0 = withHashR2(seed, x0, y1) & (255 << 1);
			hash1 = withHashR2(seed, x1, y1) & (255 << 1);

			const lx1x = withLerp(RandVecs2D[hash0]!, RandVecs2D[hash1]!, xs);
			const ly1x = withLerp(RandVecs2D[hash0 | 1]!, RandVecs2D[hash1 | 1]!, xs);

			coord.x += withLerp(lx0x, lx1x, ys) * warpAmp;
			coord.y += withLerp(ly0x, ly1x, ys) * warpAmp;
		};

		/**
		 *
		 * @param {number} seed
		 * @param {number} warpAmp
		 * @param {number} frequency
		 * @param {Vector3} coord
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 */
		const R3 = (
			seed: number,
			warpAmp: number,
			frequency: number,
			coord: Vector3,
			x: number,
			y: number,
			z: number,
		) => {
			const xf = x * frequency;
			const yf = y * frequency;
			const zf = z * frequency;

			let x0 = Math.floor(xf);
			let y0 = Math.floor(yf);
			let z0 = Math.floor(zf);

			const xs = withInterpHermite(xf - x0);
			const ys = withInterpHermite(yf - y0);
			const zs = withInterpHermite(zf - z0);

			x0 = Math.imul(x0, PrimeX);
			y0 = Math.imul(y0, PrimeY);
			z0 = Math.imul(z0, PrimeZ);
			const x1 = x0 + PrimeX;
			const y1 = y0 + PrimeY;
			const z1 = z0 + PrimeZ;

			let hash0 = withHashR3(seed, x0, y0, z0) & (255 << 2);
			let hash1 = withHashR3(seed, x1, y0, z0) & (255 << 2);

			let lx0x = withLerp(RandVecs3D[hash0]!, RandVecs3D[hash1]!, xs);
			let ly0x = withLerp(RandVecs3D[hash0 | 1]!, RandVecs3D[hash1 | 1]!, xs);
			let lz0x = withLerp(RandVecs3D[hash0 | 2]!, RandVecs3D[hash1 | 2]!, xs);

			hash0 = withHashR3(seed, x0, y1, z0) & (255 << 2);
			hash1 = withHashR3(seed, x1, y1, z0) & (255 << 2);

			let lx1x = withLerp(RandVecs3D[hash0]!, RandVecs3D[hash1]!, xs);
			let ly1x = withLerp(RandVecs3D[hash0 | 1]!, RandVecs3D[hash1 | 1]!, xs);
			let lz1x = withLerp(RandVecs3D[hash0 | 2]!, RandVecs3D[hash1 | 2]!, xs);

			const lx0y = withLerp(lx0x, lx1x, ys);
			const ly0y = withLerp(ly0x, ly1x, ys);
			const lz0y = withLerp(lz0x, lz1x, ys);

			hash0 = withHashR3(seed, x0, y0, z1) & (255 << 2);
			hash1 = withHashR3(seed, x1, y0, z1) & (255 << 2);

			lx0x = withLerp(RandVecs3D[hash0]!, RandVecs3D[hash1]!, xs);
			ly0x = withLerp(RandVecs3D[hash0 | 1]!, RandVecs3D[hash1 | 1]!, xs);
			lz0x = withLerp(RandVecs3D[hash0 | 2]!, RandVecs3D[hash1 | 2]!, xs);

			hash0 = withHashR3(seed, x0, y1, z1) & (255 << 2);
			hash1 = withHashR3(seed, x1, y1, z1) & (255 << 2);

			lx1x = withLerp(RandVecs3D[hash0]!, RandVecs3D[hash1]!, xs);
			ly1x = withLerp(RandVecs3D[hash0 | 1]!, RandVecs3D[hash1 | 1]!, xs);
			lz1x = withLerp(RandVecs3D[hash0 | 2]!, RandVecs3D[hash1 | 2]!, xs);

			coord.x += withLerp(lx0y, withLerp(lx0x, lx1x, ys), zs) * warpAmp;
			coord.y += withLerp(ly0y, withLerp(ly0x, ly1x, ys), zs) * warpAmp;
			coord.z += withLerp(lz0y, withLerp(lz0x, lz1x, ys), zs) * warpAmp;
		};

		if (coord instanceof Vector2) {
			R2(seed, warpAmp, frequency, coord, x, y);
		}

		if (coord instanceof Vector3 && z !== undefined) {
			R3(seed, warpAmp, frequency, coord, x, y, z);
		}
	}

	/**
	 * @private
	 */
	_SingleDomainWarpOpenSimplex2Gradient(
		seed: number,
		warpAmp: number,
		frequency: number,
		coord: Vector2 | Vector3,
		outGradOnly: boolean,
		x: number,
		y: number,
		z?: number,
	) {
		/**
		 *
		 * @param {number} seed
		 * @param {number} warpAmp
		 * @param {number} frequency
		 * @param {Vector2} coord
		 * @param {boolean} outGradOnly
		 * @param {number} x
		 * @param {number} y
		 */
		const R2 = (
			seed: number,
			warpAmp: number,
			frequency: number,
			coord: Vector2,
			outGradOnly: boolean,
			x: number,
			y: number,
		) => {
			const SQRT3 = 1.7320508075688772935274463415059;
			const G2 = (3 - SQRT3) / 6;

			x *= frequency;
			y *= frequency;

			let i = Math.floor(x);
			let j = Math.floor(y);
			const xi = x - i;
			const yi = y - j;

			const t = (xi + yi) * G2;
			const x0 = xi - t;
			const y0 = yi - t;

			i = Math.imul(i, PrimeX);
			j = Math.imul(j, PrimeY);

			let vx: number, vy: number;
			vx = vy = 0;

			const a = 0.5 - x0 * x0 - y0 * y0;
			if (a > 0) {
				const aaaa = a * a * (a * a);
				let xo, yo;
				if (outGradOnly) {
					const hash = withHashR2(seed, i, j) & (255 << 1);
					xo = RandVecs2D[hash]!;
					yo = RandVecs2D[hash | 1]!;
				} else {
					const hash = withHashR2(seed, i, j);
					const index1 = hash & (127 << 1);
					const index2 = (hash >> 7) & (255 << 1);
					const xg = Gradients2D[index1]!;
					const yg = Gradients2D[index1 | 1]!;
					const value = x0 * xg + y0 * yg;
					const xgo = RandVecs2D[index2]!;
					const ygo = RandVecs2D[index2 | 1]!;
					xo = value * xgo;
					yo = value * ygo;
				}
				vx += aaaa * xo;
				vy += aaaa * yo;
			}

			const c =
				2 * (1 - 2 * G2) * (1 / G2 - 2) * t +
				(-2 * (1 - 2 * G2) * (1 - 2 * G2) + a);
			if (c > 0) {
				const x2 = x0 + (2 * G2 - 1);
				const y2 = y0 + (2 * G2 - 1);
				const cccc = c * c * (c * c);
				let xo, yo;
				if (outGradOnly) {
					const hash = withHashR2(seed, i + PrimeX, j + PrimeY) & (255 << 1);
					xo = RandVecs2D[hash]!;
					yo = RandVecs2D[hash | 1]!;
				} else {
					const hash = withHashR2(seed, i + PrimeX, j + PrimeY);
					const index1 = hash & (127 << 1);
					const index2 = (hash >> 7) & (255 << 1);
					const xg = Gradients2D[index1]!;
					const yg = Gradients2D[index1 | 1]!;
					const value = x2 * xg + y2 * yg;
					const xgo = RandVecs2D[index2]!;
					const ygo = RandVecs2D[index2 | 1]!;
					xo = value * xgo;
					yo = value * ygo;
				}
				vx += cccc * xo;
				vy += cccc * yo;
			}

			if (y0 > x0) {
				const x1 = x0 + G2;
				const y1 = y0 + (G2 - 1);
				const b = 0.5 - x1 * x1 - y1 * y1;
				if (b > 0) {
					const bbbb = b * b * (b * b);
					let xo, yo;
					if (outGradOnly) {
						const hash = withHashR2(seed, i, j + PrimeY) & (255 << 1);
						xo = RandVecs2D[hash]!;
						yo = RandVecs2D[hash | 1]!;
					} else {
						const hash = withHashR2(seed, i, j + PrimeY);
						const index1 = hash & (127 << 1);
						const index2 = (hash >> 7) & (255 << 1);
						const xg = Gradients2D[index1]!;
						const yg = Gradients2D[index1 | 1]!;
						const value = x1 * xg + y1 * yg;
						const xgo = RandVecs2D[index2]!;
						const ygo = RandVecs2D[index2 | 1]!;
						xo = value * xgo;
						yo = value * ygo;
					}
					vx += bbbb * xo;
					vy += bbbb * yo;
				}
			} else {
				const x1 = x0 + (G2 - 1);
				const y1 = y0 + G2;
				const b = 0.5 - x1 * x1 - y1 * y1;
				if (b > 0) {
					const bbbb = b * b * (b * b);
					let xo, yo;
					if (outGradOnly) {
						const hash = withHashR2(seed, i + PrimeX, j) & (255 << 1);
						xo = RandVecs2D[hash]!;
						yo = RandVecs2D[hash | 1]!;
					} else {
						const hash = withHashR2(seed, i + PrimeX, j);
						const index1 = hash & (127 << 1);
						const index2 = (hash >> 7) & (255 << 1);
						const xg = Gradients2D[index1]!;
						const yg = Gradients2D[index1 | 1]!;
						const value = x1 * xg + y1 * yg;
						const xgo = RandVecs2D[index2]!;
						const ygo = RandVecs2D[index2 | 1]!;
						xo = value * xgo;
						yo = value * ygo;
					}
					vx += bbbb * xo;
					vy += bbbb * yo;
				}
			}

			coord.x += vx * warpAmp;
			coord.y += vy * warpAmp;
		};

		/**
		 *
		 * @param {number} seed
		 * @param {number} warpAmp
		 * @param {number} frequency
		 * @param {Vector3} coord
		 * @param {boolean} outGradOnly
		 * @param {number} x
		 * @param {number} y
		 * @param {number} z
		 */
		const R3 = (
			seed: number,
			warpAmp: number,
			frequency: number,
			coord: Vector3,
			outGradOnly: boolean,
			x: number,
			y: number,
			z: number,
		) => {
			x *= frequency;
			y *= frequency;
			z *= frequency;

			let i = Math.round(x);
			let j = Math.round(y);
			let k = Math.round(z);
			let x0 = x - i;
			let y0 = y - j;
			let z0 = z - k;

			let xNSign = (-x0 - 1.0) | 1;
			let yNSign = (-y0 - 1.0) | 1;
			let zNSign = (-z0 - 1.0) | 1;

			let ax0 = xNSign * -x0;
			let ay0 = yNSign * -y0;
			let az0 = zNSign * -z0;

			i = Math.imul(i, PrimeX);
			j = Math.imul(j, PrimeY);
			k = Math.imul(k, PrimeZ);

			let vx, vy, vz;
			vx = vy = vz = 0;

			let a = 0.6 - x0 * x0 - (y0 * y0 + z0 * z0);
			for (let l = 0; ; l++) {
				if (a > 0) {
					const aaaa = a * a * (a * a);
					let xo, yo, zo;
					if (outGradOnly) {
						const hash = withHashR3(seed, i, j, k) & (255 << 2);
						xo = RandVecs3D[hash]!;
						yo = RandVecs3D[hash | 1]!;
						zo = RandVecs3D[hash | 2]!;
					} else {
						const hash = withHashR3(seed, i, j, k);
						const index1 = hash & (63 << 2);
						const index2 = (hash >> 6) & (255 << 2);
						const xg = Gradients3D[index1]!;
						const yg = Gradients3D[index1 | 1]!;
						const zg = Gradients3D[index1 | 2]!;
						const value = x0 * xg + y0 * yg + z0 * zg;
						const xgo = RandVecs3D[index2]!;
						const ygo = RandVecs3D[index2 | 1]!;
						const zgo = RandVecs3D[index2 | 2]!;
						xo = value * xgo;
						yo = value * ygo;
						zo = value * zgo;
					}
					vx += aaaa * xo;
					vy += aaaa * yo;
					vz += aaaa * zo;
				}

				let b = a;
				let i1 = i;
				let j1 = j;
				let k1 = k;
				let x1 = x0;
				let y1 = y0;
				let z1 = z0;

				if (ax0 >= ay0 && ax0 >= az0) {
					x1 += xNSign;
					b = b + ax0 + ax0;
					i1 -= xNSign * PrimeX;
				} else if (ay0 > ax0 && ay0 >= az0) {
					y1 += yNSign;
					b = b + ay0 + ay0;
					j1 -= yNSign * PrimeY;
				} else {
					z1 += zNSign;
					b = b + az0 + az0;
					k1 -= zNSign * PrimeZ;
				}

				if (b > 1) {
					b -= 1;
					const bbbb = b * b * (b * b);
					let xo, yo, zo;
					if (outGradOnly) {
						const hash = withHashR3(seed, i1, j1, k1) & (255 << 2);
						xo = RandVecs3D[hash]!;
						yo = RandVecs3D[hash | 1]!;
						zo = RandVecs3D[hash | 2]!;
					} else {
						const hash = withHashR3(seed, i1, j1, k1);
						const index1 = hash & (63 << 2);
						const index2 = (hash >> 6) & (255 << 2);
						const xg = Gradients3D[index1]!;
						const yg = Gradients3D[index1 | 1]!;
						const zg = Gradients3D[index1 | 2]!;
						const value = x1 * xg + y1 * yg + z1 * zg;
						const xgo = RandVecs3D[index2]!;
						const ygo = RandVecs3D[index2 | 1]!;
						const zgo = RandVecs3D[index2 | 2]!;
						xo = value * xgo;
						yo = value * ygo;
						zo = value * zgo;
					}
					vx += bbbb * xo;
					vy += bbbb * yo;
					vz += bbbb * zo;
				}

				if (l === 1) {
					break;
				}

				ax0 = 0.5 - ax0;
				ay0 = 0.5 - ay0;
				az0 = 0.5 - az0;

				x0 = xNSign * ax0;
				y0 = yNSign * ay0;
				z0 = zNSign * az0;

				a += 0.75 - ax0 - (ay0 + az0);

				i += (xNSign >> 1) & PrimeX;
				j += (yNSign >> 1) & PrimeY;
				k += (zNSign >> 1) & PrimeZ;

				xNSign = -xNSign;
				yNSign = -yNSign;
				zNSign = -zNSign;

				seed += 1293373;
			}

			coord.x += vx * warpAmp;
			coord.y += vy * warpAmp;
			coord.z += vz * warpAmp;
		};

		if (coord instanceof Vector2) {
			R2(seed, warpAmp, frequency, coord, outGradOnly, x, y);
		}

		if (coord instanceof Vector3 && z !== undefined) {
			R3(seed, warpAmp, frequency, coord, outGradOnly, x, y, z);
		}
	}
}
