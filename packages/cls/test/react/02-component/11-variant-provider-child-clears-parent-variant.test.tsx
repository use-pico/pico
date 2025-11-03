/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls, VariantProvider } from "../../../src";

const ButtonCls = contract()
	.slots([
		"root",
		"icon",
	])
	.variant("size", [
		"sm",
		"md",
		"lg",
	])
	.variant("tone", [
		"neutral",
		"primary",
	])
	.def()
	.root({
		root: {
			class: [
				"btn",
			],
		},
		icon: {
			class: [
				"i",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"text-sm",
			],
		},
		icon: {
			class: [
				"i-sm",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"text-base",
			],
		},
		icon: {
			class: [
				"i-md",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"text-lg",
			],
		},
		icon: {
			class: [
				"i-lg",
			],
		},
	})
	.match("tone", "primary", {
		root: {
			class: [
				"primary",
			],
		},
		icon: {
			class: [
				"primary-i",
			],
		},
	})
	.defaults({
		size: "md",
		tone: "neutral",
	})
	.cls();

interface ButtonProps extends Cls.Props<typeof ButtonCls> {
	children?: string;
}

const BaseButton: FC<ButtonProps> = ({ cls = ButtonCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<button
			type="button"
			data-ui="Button-root"
			className={slots.root()}
		>
			<i
				data-ui="Button-icon"
				className={slots.icon()}
			/>
			{children}
		</button>
	);
};

const Button = BaseButton;

describe("react/02-component/variant-provider-child-clears-parent-variant", () => {
	it("child VariantProvider with empty variant clears parent's variant values", () => {
		const { container } = render(
			<div>
				<VariantProvider
					cls={ButtonCls}
					variant={{
						size: "lg",
						tone: "primary",
					}}
				>
					{/* Parent provider applies: size=lg, tone=primary */}
					<Button>Parent</Button>

					<VariantProvider
						cls={ButtonCls}
						variant={{}}
					>
						{/* Child provider clears parent variants, reverts to defaults */}
						<Button>Child</Button>
					</VariantProvider>
				</VariantProvider>
			</div>,
		);

		// Get all buttons
		const buttons = container.querySelectorAll('[data-ui="Button-root"]');
		const parentButton = buttons[0]; // First button (parent context)
		const childButton = buttons[1]; // Second button (child context)

		// Get icons
		const icons = container.querySelectorAll('[data-ui="Button-icon"]');
		const parentIcon = icons[0]; // First icon (parent context)
		const childIcon = icons[1]; // Second icon (child context)

		// Parent button should have lg + primary classes
		expect(parentButton?.className).toBe("btn text-lg primary");
		expect(parentIcon?.className).toBe("i i-lg primary-i");

		// Child button should revert to defaults (size=md, tone=neutral)
		expect(childButton?.className).toBe("btn text-base");
		expect(childIcon?.className).toBe("i i-md");
	});
});
