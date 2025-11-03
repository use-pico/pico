import { promises as fs } from "node:fs";
import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import type { Plugin } from "vite";

type Row = {
	stamp: string; // ISO timestamp
	files: number; // number of regular files
	bytes: number; // total size in bytes
};

export interface AssetSizePluginOptions {
	/**
	 * Output file path for asset size data (NDJSON format)
	 * @default "asset.size.ndjson"
	 */
	assetSizeFile?: string;
	/**
	 * Whether this is an SSR build
	 */
	ssr: boolean;
}

async function exists(p: string) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

function nowIso() {
	return new Date().toISOString();
}

function fmt(n: number) {
	const mb = (n / (1024 * 1024)).toFixed(2);
	return `${mb} MB`;
}

// Count static assets from Vite's output bundle
function countStaticAssets(bundle: OutputBundle): {
	files: number;
	bytes: number;
} {
	let files = 0;
	let bytes = 0;

	for (const [fileName, chunkOrAsset] of Object.entries(bundle)) {
		// Only count static assets (JS, CSS, etc.) from the static output directory
		if (
			fileName.includes("/assets/") ||
			fileName.startsWith("assets/") ||
			fileName.match(/\.(js|css|woff2?|png|jpg|svg)$/i)
		) {
			const item = chunkOrAsset as OutputAsset | OutputChunk;
			if (item.type === "asset") {
				const asset = item as OutputAsset;
				files += 1;
				bytes +=
					typeof asset.source === "string"
						? asset.source.length
						: asset.source instanceof Uint8Array
							? asset.source.byteLength
							: 0;
			} else if (item.type === "chunk") {
				const chunk = item as OutputChunk;
				files += 1;
				bytes += chunk.code?.length || 0;
			}
		}
	}

	return {
		files,
		bytes,
	};
}

export function assetSizePlugin(options: AssetSizePluginOptions): Plugin {
	const { assetSizeFile = "asset.size.ndjson", ssr: isSSR } = options;

	return {
		name: "asset-size",
		apply: "build",
		async writeBundle(_options, bundle: OutputBundle) {
			if (isSSR) {
				return;
			}

			const { files, bytes } = countStaticAssets(bundle);

			if (files === 0) {
				return;
			}

			const row: Row = {
				stamp: nowIso(),
				files,
				bytes,
			};

			// Ensure file exists
			if (!(await exists(assetSizeFile))) {
				await fs.writeFile(assetSizeFile, "", "utf8");
			}

			await fs.appendFile(
				assetSizeFile,
				`${JSON.stringify(row)}
`,
				"utf8",
			);

			console.log(`\t Asset size – files=${files} size=${fmt(bytes)}`);
		},
	};
}
