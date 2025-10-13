import { type ClassNameValue, twMerge } from "tailwind-merge";

export const tvc = (...classLists: ClassNameValue[]): string => {
	const merged = twMerge(...classLists);
	if (!merged) {
		return "";
	}

	const tokens = merged.split(/\s+/).filter(Boolean);
	const seen = new Set<string>();
	const outRev: string[] = [];
	for (let i = tokens.length - 1; i >= 0; i--) {
		const token = tokens[i];
		if (token === undefined) {
			continue;
		}
		if (!seen.has(token)) {
			seen.add(token);
			outRev.push(token);
		}
	}

	return outRev.reverse().join(" ");
};
