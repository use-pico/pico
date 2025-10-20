import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls } from "../../../src";

// Create a circular dependency test
const CircularTokens = contract()
	.tokens([
		"circular1",
		"circular2",
		"circular3",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		circular1: {
			token: [
				"circular2",
			],
			class: [
				"C1",
			],
		},
		circular2: {
			token: [
				"circular3",
			],
			class: [
				"C2",
			],
		},
		circular3: {
			token: [
				"circular1",
			],
			class: [
				"C3",
			],
		}, // Creates circular dependency
	})
	.root({
		root: {
			token: [
				"circular1",
			],
			class: [
				"ROOT",
			],
		},
	})
	.cls();

interface CircularProps extends Cls.Props<typeof CircularTokens> {}
const BaseCircularComponent: FC<CircularProps> = ({
	cls = CircularTokens,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Circular-root"
			className={slots.root()}
		/>
	);
};
const CircularComponent = BaseCircularComponent;

describe("react/04-complex/circular-dependency-detection", () => {
	it("detects circular token dependencies and throws meaningful error", () => {
		expect(() => {
			render(<CircularComponent />);
		}).toThrow("Circular dependency detected in token references");
	});
});
