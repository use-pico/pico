import { strictTypeof } from "../toolbox/strictTypeOf";
import { Tags } from "./Tags";
import { Version } from "./Version";

function encodeNumber(num: number): number[] {
	const buffer = new ArrayBuffer(8);
	const view = new DataView(buffer);
	view.setFloat64(0, num, true);
	const bytes = new Uint8Array(buffer);
	return Array.from(bytes);
}

function encodeString(string: string): number[] {
	let data: number[] = [];
	const encoder = new TextEncoder();
	const text = encoder.encode(string);

	data = data.concat(encodeNumber(text.length));
	data = data.concat(Array.from(text));
	return data;
}

function encodeBigInt(bigint: bigint): number[] {
	let data = [];

	data.push(bigint < 0 ? 1 : 0);
	let nonNegativeBigint = bigint < 0 ? -bigint : bigint;

	if (nonNegativeBigint === 0n) {
		data.push(0);
		return data;
	}

	const payload = [];
	while (nonNegativeBigint > 0n) {
		payload.unshift(Number(nonNegativeBigint & 255n));
		nonNegativeBigint /= 256n;
	}

	if (payload.length > 255) {
		throw new Error("Unsupported payload length.");
	}

	data.push(payload.length);
	data = data.concat(payload);

	return data;
}

/**
 * Recursively encodes a item
 */
function encodeValue(item: unknown): number[] {
	switch (strictTypeof(item)) {
		case "Object": {
			const aObj = item as Record<string, unknown>;

			let bytes = [];
			bytes.push(Tags.Object);

			const keys = Object.keys(aObj);

			for (let i = 0; i < keys.length; i++) {
				const key = keys[i]!;
				const value = aObj[key];

				if (i % 0xff === 0) {
					bytes.push(Math.min(keys.length - i, 0xff));
				}

				bytes = bytes.concat(encodeString(key));
				bytes = bytes.concat(encodeValue(value));
			}

			bytes.push(Tags.End);
			return bytes;
		}
		case "Set": {
			const aSet = item as Set<unknown>;

			let bytes = [];
			bytes.push(Tags.Set);

			const setIter = aSet.values();

			for (let i = 0; i < aSet.size; i++) {
				const { value } = setIter.next();

				if (i % 0xff === 0) {
					bytes.push(Math.min(aSet.size - i, 0xff));
				}

				bytes = bytes.concat(encodeValue(value));
			}

			bytes.push(Tags.End);
			return bytes;
		}
		case "Map": {
			const aMap = item as Map<unknown, unknown>;

			let bytes = [];
			bytes.push(Tags.Map);

			const mapIter = aMap.entries();

			for (let i = 0; i < aMap.size; i++) {
				const next = mapIter.next();
				if (next.done) {
					break;
				}

				const [key, value] = next.value;

				if (i % 0xff === 0) {
					bytes.push(Math.min(aMap.size - i, 0xff));
				}

				bytes = bytes.concat(encodeValue(key));
				bytes = bytes.concat(encodeValue(value));
			}

			bytes.push(Tags.End);
			return bytes;
		}
		case "Array": {
			const aArray = item as unknown[];

			let bytes = [];
			bytes.push(Tags.Array);

			for (let i = 0; i < aArray.length; i++) {
				const value = aArray[i];

				if (i % 0xff === 0) {
					bytes.push(Math.min(aArray.length - i, 0xff));
				}

				bytes = bytes.concat(encodeValue(value));
			}

			bytes.push(Tags.End);
			return bytes;
		}
		case "Boolean":
			return [Tags.Boolean, (item as boolean) ? 1 : 0];
		case "String":
			return [Tags.String].concat(encodeString(item as string));
		case "null":
			return [Tags.null];
		case "-Infinity":
		case "Infinity":
		case "NaN":
		case "Number": {
			const aNumber = item as number;

			return [Tags.Number].concat(encodeNumber(aNumber));
		}
		case "Date": {
			const aDate = item as Date;

			return [Tags.Date].concat(encodeNumber(aDate.getTime()));
		}
		case "BigInt":
			return [Tags.BigInt].concat(encodeBigInt(item as bigint));
		case "undefined":
			return [Tags.undefined];
		default:
			throw new Error("Unsupported data type.");
	}
}

/**
 * Encodes the data into a binary format
 * @param obj The input data
 * @returns The data serialized into a binary format
 */
export function encode(obj: unknown): Uint8Array {
	// Compute the encoded result and prepend the version tag
	const bytes: number[] = [...encodeString(Version), ...encodeValue(obj)];

	// Return the encoded result as an Uint8Array
	return new Uint8Array(bytes);
}
