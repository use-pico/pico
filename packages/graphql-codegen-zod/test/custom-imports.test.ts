import { buildSchema } from "graphql";
import { describe, expect, it } from "vitest";
import { withZodPlugin } from "../src/index";

describe("Custom Imports", () => {
	const schema = buildSchema(`
		scalar AWSDateTime
		scalar CustomScalar

		type User {
			id: ID!
			name: String
			createdAt: AWSDateTime!
			metadata: CustomScalar
		}

		type Query {
			user(id: ID!): User
		}
	`);

	it("should include custom imports in generated output", () => {
		const config = {
			scalars: {
				AWSDateTime: "zInstant",
				CustomScalar: "customScalar",
			},
			imports: [
				'import { zInstant } from "temporal-zod";',
				'import { customScalar } from "./custom-scalars";',
			],
		};

		const result = withZodPlugin(schema, [], config) as string;

		// Check that the default zod import is present
		expect(result).toContain('import { z } from "zod";');

		// Check that custom imports are included
		expect(result).toContain('import { zInstant } from "temporal-zod";');
		expect(result).toContain(
			'import { customScalar } from "./custom-scalars";',
		);

		// Verify custom imports appear after the zod import
		const zodImportIndex = result.indexOf('import { z } from "zod";');
		const temporalImportIndex = result.indexOf(
			'import { zInstant } from "temporal-zod";',
		);
		const customImportIndex = result.indexOf(
			'import { customScalar } from "./custom-scalars";',
		);

		expect(temporalImportIndex).toBeGreaterThan(zodImportIndex);
		expect(customImportIndex).toBeGreaterThan(zodImportIndex);
	});

	it("should use custom scalar types in generated schemas", () => {
		const config = {
			scalars: {
				AWSDateTime: "zInstant",
				CustomScalar: "customScalar",
			},
			imports: [
				'import { zInstant } from "temporal-zod";',
			],
		};

		const result = withZodPlugin(schema, [], config) as string;

		// Check that the User schema uses the custom scalar types
		expect(result).toContain("createdAt: zInstant");
		expect(result).toContain("metadata: customScalar");
	});

	it("should work without custom imports", () => {
		const config = {
			scalars: {
				AWSDateTime: "z.date()",
			},
		};

		const result = withZodPlugin(schema, [], config) as string;

		// Check that only the default zod import is present
		expect(result).toContain('import { z } from "zod";');

		// Check that no temporal-zod import is present
		expect(result).not.toContain("temporal-zod");

		// Check that the schema uses the standard zod type
		expect(result).toContain("createdAt: z.date()");
	});

	it("should handle empty imports array", () => {
		const config = {
			scalars: {
				AWSDateTime: "z.date()",
			},
			imports: [],
		};

		const result = withZodPlugin(schema, [], config) as string;

		// Check that only the default zod import is present
		expect(result).toContain('import { z } from "zod";');

		// Verify no extra imports
		const importLines = result
			.split("\n")
			.filter((line) => line.includes("import"));
		expect(importLines.length).toBe(1); // only zod import
	});

	it("should handle multiple custom imports", () => {
		const config = {
			imports: [
				'import { zInstant } from "temporal-zod";',
				'import { customScalar } from "./custom-scalars";',
				'import { anotherValidator } from "./validators";',
			],
		};

		const result = withZodPlugin(schema, [], config) as string;

		// All imports should be present
		expect(result).toContain('import { zInstant } from "temporal-zod";');
		expect(result).toContain(
			'import { customScalar } from "./custom-scalars";',
		);
		expect(result).toContain(
			'import { anotherValidator } from "./validators";',
		);
	});
});
