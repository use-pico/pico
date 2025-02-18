export function strictTypeof(value: unknown): string {
	const type = typeof value;

	switch (type) {
		case "object": {
			if (value === null) {
				return "null";
			}

			const obj = value as Record<string, unknown>;
			return obj.constructor.name;
		}
		case "number":
			if (Number.isNaN(value)) {
				return "NaN";
			}
			if (value === Number.POSITIVE_INFINITY) {
				return "Infinity";
			}
			if (value === Number.NEGATIVE_INFINITY) {
				return "-Infinity";
			}
			return "Number";
		case "string":
			return "String";
		case "boolean":
			return "Boolean";
		case "function":
			return "Function";
		case "symbol":
			return "Symbol";
		case "bigint":
			return "BigInt";
		default:
			return type;
	}
}
