import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Boolean Variants", () => {
	it("should handle boolean variants with what.variant", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					disabled: [
						"bool",
					],
					loading: [
						"bool",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"inline-flex",
							"items-center",
						]),
					}),
					def.rule(
						what.variant({
							disabled: true,
						}),
						{
							root: what.css([
								"opacity-50",
								"cursor-not-allowed",
							]),
						},
					),
					def.rule(
						what.variant({
							loading: true,
						}),
						{
							root: what.css([
								"animate-spin",
								"cursor-wait",
							]),
						},
					),
				],
				defaults: def.defaults({
					disabled: false,
					loading: false,
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("inline-flex items-center");

		const disabledInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"inline-flex items-center opacity-50 cursor-not-allowed",
		);

		const loadingInstance = Button.create(({ what }) => ({
			variant: what.variant({
				loading: true,
			}),
		}));
		expect(loadingInstance.root()).toBe(
			"inline-flex items-center animate-spin cursor-wait",
		);

		const disabledLoadingInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
				loading: true,
			}),
		}));
		expect(disabledLoadingInstance.root()).toBe(
			"inline-flex items-center opacity-50 animate-spin cursor-wait",
		);
	});
});
