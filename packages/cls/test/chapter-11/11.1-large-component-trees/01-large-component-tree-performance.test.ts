import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("11.1 Large Component Trees - Performance with Deep Inheritance", () => {
	it("should handle deep inheritance chains efficiently with proper token and variant inheritance", () => {
		// Level 1: Base component
		const Level1 = cls(
			{
				tokens: [
					"level.base.1",
					"feature.type.a",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"1",
					],
					feature: [
						"a",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"level.base.1": what.css([
						"level-1-base",
					]),
					"feature.type.a": what.css([
						"feature-a",
					]),
				}),
				rules: [
					def.rule(
						{
							level: "1",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.1",
								"feature.type.a",
							]),
						},
					),
				],
				defaults: def.defaults({
					level: "1",
					feature: "a",
				}),
			}),
		);

		// Level 2: Independent component with level 2
		const Level2 = cls(
			{
				tokens: [
					"level.base.1",
					"level.base.2",
					"feature.type.a",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"1",
						"2",
					],
					feature: [
						"a",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"level.base.1": what.css([
						"level-1-base",
					]),
					"level.base.2": what.css([
						"level-2-base",
					]),
					"feature.type.a": what.css([
						"feature-a",
					]),
				}),
				rules: [
					def.rule(
						{
							level: "1",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.1",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.2",
								"feature.type.a",
							]),
						},
					),
				],
				defaults: def.defaults({
					level: "2",
					feature: "a",
				}),
			}),
		);

		// Level 3: Independent component with level 3
		const Level3 = cls(
			{
				tokens: [
					"level.base.1",
					"level.base.2",
					"level.base.3",
					"feature.type.a",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"1",
						"2",
						"3",
					],
					feature: [
						"a",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"level.base.1": what.css([
						"level-1-base",
					]),
					"level.base.2": what.css([
						"level-2-base",
					]),
					"level.base.3": what.css([
						"level-3-base",
					]),
					"feature.type.a": what.css([
						"feature-a",
					]),
				}),
				rules: [
					def.rule(
						{
							level: "1",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.1",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.2",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "3",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.3",
								"feature.type.a",
							]),
						},
					),
				],
				defaults: def.defaults({
					level: "3",
					feature: "a",
				}),
			}),
		);

		// Level 4: Independent component with feature b
		const Level4 = cls(
			{
				tokens: [
					"level.base.1",
					"level.base.2",
					"level.base.3",
					"feature.type.a",
					"feature.type.b",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"1",
						"2",
						"3",
					],
					feature: [
						"a",
						"b",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"level.base.1": what.css([
						"level-1-base",
					]),
					"level.base.2": what.css([
						"level-2-base",
					]),
					"level.base.3": what.css([
						"level-3-base",
					]),
					"feature.type.a": what.css([
						"feature-a",
					]),
					"feature.type.b": what.css([
						"feature-b",
					]),
				}),
				rules: [
					def.rule(
						{
							level: "1",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.1",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.2",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "3",
							feature: "a",
						},
						{
							root: what.token([
								"level.base.3",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "1",
							feature: "b",
						},
						{
							root: what.token([
								"level.base.1",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "b",
						},
						{
							root: what.token([
								"level.base.2",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "3",
							feature: "b",
						},
						{
							root: what.token([
								"level.base.3",
								"feature.type.b",
							]),
						},
					),
				],
				defaults: def.defaults({
					level: "3",
					feature: "b",
				}),
			}),
		);

		// Level 5: Independent component with level 5
		const Level5 = cls(
			{
				tokens: [
					"level.base.1",
					"level.base.2",
					"level.base.3",
					"level.base.4",
					"level.base.5",
					"feature.type.a",
					"feature.type.b",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"1",
						"2",
						"3",
						"4",
						"5",
					],
					feature: [
						"a",
						"b",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"level.base.1": [
						"level-1-base",
					],
					"level.base.2": [
						"level-2-base",
					],
					"level.base.3": [
						"level-3-base",
					],
					"level.base.4": [
						"level-4-base",
					],
					"level.base.5": [
						"level-5-base",
					],
					"feature.type.a": [
						"feature-a",
					],
					"feature.type.b": [
						"feature-b",
					],
				}),
				rules: [
					def.rule(
						{
							level: "1",
							feature: "a",
						},
						{
							root: what.css([
								"level.base.1",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "a",
						},
						{
							root: what.css([
								"level.base.2",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "3",
							feature: "a",
						},
						{
							root: what.css([
								"level.base.3",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "4",
							feature: "a",
						},
						{
							root: what.css([
								"level.base.4",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "5",
							feature: "a",
						},
						{
							root: what.css([
								"level.base.5",
								"feature.type.a",
							]),
						},
					),
					def.rule(
						{
							level: "1",
							feature: "b",
						},
						{
							root: what.css([
								"level.base.1",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "2",
							feature: "b",
						},
						{
							root: what.css([
								"level.base.2",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "3",
							feature: "b",
						},
						{
							root: what.css([
								"level.base.3",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "4",
							feature: "b",
						},
						{
							root: what.css([
								"level.base.4",
								"feature.type.b",
							]),
						},
					),
					def.rule(
						{
							level: "5",
							feature: "b",
						},
						{
							root: what.css([
								"level.base.5",
								"feature.type.b",
							]),
						},
					),
				],
				defaults: def.defaults({
					level: "5",
					feature: "b",
				}),
			}),
		);

		// Test Level1 default behavior
		const level1Default = Level1.create();
		expect(level1Default.root()).toBe("level-1-base feature-a");

		// Test Level2 default behavior (should use Level2 defaults)
		const level2Default = Level2.create();
		expect(level2Default.root()).toBe("level-2-base feature-a");

		// Test Level3 default behavior
		const level3Default = Level3.create();
		expect(level3Default.root()).toBe("level-3-base feature-a");

		// Test Level4 default behavior
		const level4Default = Level4.create();
		expect(level4Default.root()).toBe("level-3-base feature-b");

		// Test Level5 default behavior
		const level5Default = Level5.create();
		expect(level5Default.root()).toBe("level-5-base feature-b");

		// Test Level2 with explicit variants
		const level2Explicit = Level2.create(() => ({
			variant: {
				level: "1",
			},
		}));
		expect(level2Explicit.root()).toBe("level-1-base feature-a");

		// Test Level3 with explicit variants
		const level3Explicit = Level3.create(() => ({
			variant: {
				level: "2",
			},
		}));
		expect(level3Explicit.root()).toBe("level-2-base feature-a");

		// Test Level5 with explicit variants
		const level5Explicit = Level5.create(() => ({
			variant: {
				level: "4",
			},
		}));
		expect(level5Explicit.root()).toBe("level-4-base feature-b");

		// Test inheritance chain maintains proper precedence
		const level5Level1 = Level5.create(() => ({
			variant: {
				level: "1",
			},
		}));
		expect(level5Level1.root()).toBe("level-1-base feature-b");
	});
});
