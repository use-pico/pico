/** biome-ignore-all lint/style/noNonNullAssertion: Sssst! */
export namespace embedMinHash {
	export interface Props {
		value: string;
		dimensions?: number;
	}
}

const mix64 = (seed: bigint): bigint => {
	let z = seed + 0x9e3779b97f4a7c15n;
	z = (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n;
	z = (z ^ (z >> 27n)) * 0x94d049bb133111ebn;
	z ^= z >> 31n;
	return z & ((1n << 64n) - 1n);
};

const codePoint = (ch: string): number => ch.codePointAt(0) ?? 0;

const hashFeature = (s: string): bigint => {
	let h = 0n;
	for (const ch of s) {
		h ^= BigInt(codePoint(ch));
		h = (h << 13n) ^ (h >> 7n) ^ 0x9e3779b97f4a7c15n;
	}
	return mix64(h);
};

export const embedMinHash = ({
	value,
	dimensions = 64,
}: embedMinHash.Props): number[] => {
	const out = new Float32Array(dimensions);

	const norm = value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/\p{Diacritic}+/gu, "")
		.replace(/[^\p{L}\p{N}\s]+/gu, " ")
		.replace(/\s+/g, " ")
		.trim();

	if (norm.length === 0) {
		return Array.from(out);
	}

	const tokens = norm.match(/[\p{L}\p{N}]+/gu) ?? [];
	const bitWeights = new Int32Array(64);

	// (A) bag-of-words
	for (let i = 0; i < tokens.length; i++) {
		const tok = tokens[i]!;
		const h = hashFeature(tok);
		for (let b = 0; b < 64; b++) {
			const bit = Number((h >> BigInt(63 - b)) & 1n);
			const prev = bitWeights[b]!;
			bitWeights[b] = (prev + (bit === 1 ? 1 : -1)) as number;
		}
	}

	// (B) intra-token 3..5-gramy
	for (let t = 0; t < tokens.length; t++) {
		const tok = tokens[t]!;
		const cps: number[] = [];
		for (const ch of tok) cps.push(codePoint(ch));

		for (let n = 3; n <= 5; n++) {
			if (cps.length < n) continue;
			for (let i = 0; i + n <= cps.length; i++) {
				let h = 0n;
				const end = i + n;
				for (let k = i; k < end; k++) {
					const cp = cps[k]!;
					h ^= BigInt(cp);
					h = (h << 13n) ^ (h >> 7n) ^ 0x9e3779b97f4a7c15n;
				}
				h = mix64(h);
				for (let b = 0; b < 64; b++) {
					const bit = Number((h >> BigInt(63 - b)) & 1n);
					const prev = bitWeights[b]!;
					bitWeights[b] = (prev + (bit === 1 ? 1 : -1)) as number;
				}
			}
		}
	}

	const pattern = new Float32Array(64);
	for (let b = 0; b < 64; b++) {
		pattern[b] = bitWeights[b]! >= 0 ? 1 : -1;
	}

	if (dimensions <= 64) {
		out.set(pattern.subarray(0, dimensions));
		return Array.from(out);
	}
	let off = 0;
	while (off + 64 <= dimensions) {
		out.set(pattern, off);
		off += 64;
	}
	if (off < dimensions) {
		out.set(pattern.subarray(0, dimensions - off), off);
	}
	return Array.from(out);
};
