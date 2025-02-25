export function smoothstep(edge0: number, edge1: number, x: number): number {
	x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
	return x * x * (3 - 2 * x);
}
