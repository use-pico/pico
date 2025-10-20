import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls } from "../../../src";

const ButtonCls = contract()
	.slots([
		"root",
		"icon",
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
	.cls();

const CustomCls = contract()
	.slots([
		"root",
		"icon",
	])
	.def()
	.root({
		root: {
			class: [
				"custom",
			],
		},
		icon: {
			class: [
				"ci",
			],
		},
	})
	.cls();

interface ButtonProps extends Cls.Props<typeof ButtonCls> {}

const BaseButton: FC<ButtonProps> = ({ cls = ButtonCls, tweak }) => {
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
		</button>
	);
};

const Button = BaseButton;

describe("react/02-component/withcls-custom-cls-prop-replaces-default", () => {
	it("using custom cls prop replaces default module behavior", () => {
		const { container, rerender } = render(<Button />);
		const root = () =>
			container.querySelector('[data-ui="Button-root"]') as HTMLElement;
		const icon = () =>
			container.querySelector('[data-ui="Button-icon"]') as HTMLElement;
		expect(root().className).toBe("btn");
		expect(icon().className).toBe("i");

		rerender(<Button cls={CustomCls} />);
		expect(root().className).toBe("custom");
		expect(icon().className).toBe("ci");
	});
});
