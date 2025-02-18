import { Tags } from "./Tags";
import { Version } from "./Version";

/**
 * The reader function used by JsBin's decoder
 */
export type Reader = (length: number, slice?: boolean) => number[];

function decodeNumber(reader: Reader): number {
	const nums = reader(8);
	const { buffer } = new Uint8Array(nums);
	const view = new DataView(buffer);
	return view.getFloat64(0, true);
}

function decodeBigInt(reader: Reader): bigint {
	let bigint = 0n;
	const sign = reader(1)[0] === 1;
	const [payloadLength] = reader(1);

	for (let i = 0; i < payloadLength!; i++) {
		bigint += BigInt(reader(1)[0]!) * 256n ** BigInt(payloadLength! - i - 1);
	}

	bigint = sign ? -bigint : bigint;

	return bigint;
}

function decodeString(reader: Reader): string {
	const length = decodeNumber(reader);
	const decoder = new TextDecoder();
	return decoder.decode(new Uint8Array(reader(length)));
}

function decodeReader(reader: Reader): unknown {
	// Match the leading tag of the data
	switch (reader(1)[0]) {
		case Tags.Object: {
			const object: Record<string, unknown> = {};
			let itemsLeft = 0;

			while (true) {
				if (itemsLeft === 0) {
					const [extension] = reader(1);
					if (extension === 0) {
						break;
					}

					itemsLeft += extension!;
				}

				const key = decodeString(reader);
				const value = decodeReader(reader);

				object[key] = value;

				itemsLeft--;
			}

			return object;
		}
		case Tags.Boolean: {
			const state = reader(1)[0] === 1;

			return state;
		}
		case Tags.String: {
			return decodeString(reader);
		}
		case Tags.null: {
			return null;
		}
		case Tags.Array: {
			const array = [];
			let itemsLeft = 0;

			while (true) {
				if (itemsLeft === 0) {
					const [extension] = reader(1);
					if (extension === 0) {
						break;
					}

					itemsLeft += extension!;
				}

				const value = decodeReader(reader);

				array.push(value);

				itemsLeft--;
			}

			return array;
		}
		case Tags.Number: {
			return decodeNumber(reader);
		}
		case Tags.Date: {
			const time = decodeNumber(reader);

			return new Date(time);
		}
		case Tags.BigInt: {
			return decodeBigInt(reader);
		}
		case Tags.Set: {
			const set = new Set();
			let itemsLeft = 0;

			while (true) {
				if (itemsLeft === 0) {
					const [extension] = reader(1);
					if (extension === 0) {
						break;
					}

					itemsLeft += extension!;
				}

				const value = decodeReader(reader);

				set.add(value);

				itemsLeft--;
			}

			return set;
		}
		case Tags.Map: {
			const map = new Map();
			let itemsLeft = 0;

			while (true) {
				if (itemsLeft === 0) {
					const [extension] = reader(1);
					if (extension === 0) {
						break;
					}

					itemsLeft += extension!;
				}

				const key = decodeReader(reader);
				const value = decodeReader(reader);

				map.set(key, value);

				itemsLeft--;
			}

			return map;
		}
		case Tags.undefined: {
			return undefined;
		}
		default: {
			throw new Error("Unknown tag.");
		}
	}
}

/**
 * Decodes the encoded input back into data
 * @param input The input Uint8Array
 * @returns The deserialized data structure of the binary format
 */
export function decode(input: Uint8Array): unknown {
	const decoding = Array.from(input);

	// Create the reader
	const reader: Reader = (length: number, slice = true) =>
		decoding[slice ? "splice" : "slice"](0, length);

	// Check version tag
	const version = decodeString(reader);
	if (version !== Version) {
		throw new Error(
			`Unknown or unsupported version, expected version "${Version}" but got "${version}"`,
		);
	}

	// Return decoded result
	return decodeReader(reader);
}
