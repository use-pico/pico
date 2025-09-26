import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls, withCls } from "../../../src";

const ButtonCls = contract()
	.tokens([
		"color",
		"size",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		color: {
			class: [
				"text-blue-600",
			],
		},
		size: {
			class: [
				"px-4",
				"py-2",
			],
		},
	})
	.root({
		root: {
			token: [
				"color",
				"size",
			],
			class: [
				"button",
			],
		},
	})
	.cls();

const ThemeCls = contract()
	.tokens([
		"color",
		"size",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		color: {
			class: [
				"text-red-600",
			],
		},
		size: {
			class: [
				"px-6",
				"py-3",
			],
		},
	})
	.root({
		root: {
			class: [
				"theme",
			],
		},
	})
	.cls();

interface ButtonProps {
	cls?: typeof ButtonCls;
}

const BaseButton: FC<ButtonProps> = ({ cls = ButtonCls }) => {
	const { slots } = useCls(cls);
	return (
		<button
			type="button"
			data-ui="Button-root"
			className={slots.root()}
		>
			Click me
		</button>
	);
};

const Button = withCls(BaseButton, ButtonCls);

describe("react/03-context/token-context-functionality", () => {
	it("should apply tokens from TokenProvider correctly", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Button />
			</TokenProvider>,
		);
		const root = container.querySelector(
			'[data-ui="Button-root"]',
		) as HTMLElement;

		// TokenProvider correctly applies theme tokens:
		// - ThemeCls tokens override ButtonCls tokens
		// - Result: "text-red-600 px-6 py-3 button" (theme tokens + button classes)
		expect(root?.className).toBe("text-red-600 px-6 py-3 button");
	});

	it("should work without TokenContext", () => {
		const { container } = render(<Button />);
		const root = container.querySelector(
			'[data-ui="Button-root"]',
		) as HTMLElement;

		// Without context, should use default ButtonCls tokens
		expect(root?.className).toBe("text-blue-600 px-4 py-2 button");
	});

	it("should handle empty TokenProvider gracefully", () => {
		// Create an empty CLS instance with no tokens
		const EmptyCls = contract()
			.tokens([])
			.slots([
				"root",
			])
			.def()
			.root({
				root: {
					class: [
						"empty",
					],
				},
			})
			.cls();

		const { container } = render(
			<TokenProvider cls={EmptyCls}>
				<Button />
			</TokenProvider>,
		);
		const root = container.querySelector(
			'[data-ui="Button-root"]',
		) as HTMLElement;

		// With empty context, should fall back to default ButtonCls tokens
		expect(root?.className).toBe("text-blue-600 px-4 py-2 button");
	});
});
