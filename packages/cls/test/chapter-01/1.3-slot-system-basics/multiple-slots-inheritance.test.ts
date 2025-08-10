import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Inheritance", () => {
	it("should handle slot inheritance correctly", () => {
		const BaseComponent = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"base-root",
						]),
						label: what.css([
							"base-label",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: {},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						icon: what.css([
							"new-icon",
						]),
					}),
					def.rule(
						{},
						{
							root: what.css([
								"extended-root",
							]),
							label: what.css([
								"extended-label",
							]),
						},
					),
				],
				defaults: {},
			}),
		);

		const instance = ExtendedComponent.create();
		expect(instance.root()).toBe("base-root extended-root");
		expect(instance.label()).toBe("base-label extended-label");
		expect(instance.icon()).toBe("new-icon");
	});
});
