import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";

const root = "/Users/marekhanzal/Project/use-pico/pico/packages/cls/test";

function* walk(dir) {
	for (const entry of readdirSync(dir)) {
		const p = join(dir, entry);
		const st = statSync(p);
		if (st.isDirectory()) {
			yield* walk(p);
		} else if (p.endsWith(".test.ts") || p.endsWith(".test.tsx")) {
			yield p;
		}
	}
}

function flattenTokensInContent(content) {
	let idx = 0;
	let out = content;
	while (true) {
		const start = out.indexOf("tokens", idx);
		if (start === -1) break;
		const colon = out.indexOf(":", start);
		if (colon === -1) break;
		let i = colon + 1;
		while (i < out.length && /\s/.test(out[i])) i++;
		if (out[i] !== "{") {
			idx = i;
			continue;
		}
		const objStart = i;
		let depth = 0;
		let j = objStart;
		while (j < out.length) {
			const ch = out[j];
			if (ch === "{") depth++;
			else if (ch === "}") {
				depth--;
				if (depth === 0) {
					j++;
					break;
				}
			}
			j++;
		}
		const objEnd = j;
		const objBody = out.slice(objStart + 1, objEnd - 1);

		const pairRe = /(\s*["'`](.+?)["'`]\s*:)\s*\[((?:[^\]\n]|\n)*?)\]/g;
		let m;
		const keys = [];
		while ((m = pairRe.exec(objBody)) !== null) {
			const group = m[2];
			const arrBody = m[3];
			const varRe = /["'`]([^"'`]+)["'`]/g;
			let vm;
			while ((vm = varRe.exec(arrBody)) !== null) {
				keys.push(`${group}.${vm[1]}`);
			}
		}

		const lineStart = out.lastIndexOf("\n", start) + 1;
		const indent = out.slice(lineStart, start);
		const innerIndent = indent + "\t";
		const arrLines = keys.map((k) => `${innerIndent}"${k}",`);
		const arrBlock =
			`[` +
			(arrLines.length ? `\n${arrLines.join("\n")}\n${indent}` : "") +
			`]`;

		out = out.slice(0, objStart) + arrBlock + out.slice(objEnd);
		idx = objStart + arrBlock.length;
	}
	return out;
}

let changedCount = 0;
for (const file of walk(root)) {
	const orig = readFileSync(file, "utf8");
	const content = flattenTokensInContent(orig);
	if (content !== orig) {
		writeFileSync(file, content, "utf8");
		changedCount++;
	}
}

console.log(`Updated ${changedCount} files.`);
