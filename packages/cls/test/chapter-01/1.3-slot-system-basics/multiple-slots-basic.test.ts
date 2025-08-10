import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Basic", () => {
	it("should create component with multiple slots", () => {
		const Card = cls(
			{
				tokens: {},
				slot: [
					"root",
					"header",
					"body",
					"footer",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"bg-white",
							"rounded-lg",
							"shadow",
						]),
						header: what.css([
							"px-4",
							"py-3",
							"border-b",
						]),
						body: what.css([
							"px-4",
							"py-4",
						]),
						footer: what.css([
							"px-4",
							"py-3",
							"border-t",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Card.create();
		expect(instance.root()).toBe("bg-white rounded-lg shadow");
		expect(instance.header()).toBe("px-4 py-3 border-b");
		expect(instance.body()).toBe("px-4 py-4");
		expect(instance.footer()).toBe("px-4 py-3 border-t");
	});
});
